import { Injectable, Inject } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateToken } from 'src/helpers/generateToken';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import errors from 'src/constants/errors';
import { loginDto } from '../dtos/login.dto';
import { getTokenPayload } from 'src/helpers/getTokenPayload';

@Injectable()
export class userService {
  private loginExpirationTime: number;
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.loginExpirationTime = 48 * 60 * 60;
  }

  async create(userdata): Promise<User> {
    const date: Date = new Date();
    userdata.joinAt = date;
    const userModel = new this.UserModel(userdata);
    return userModel.save();
  }

  async existOrNot(nationalId: string): Promise<boolean> {
    const result: object[] = await this.UserModel.find({ nationalId });
    return !!result.length;
  }

  generateToken(payload): string {
    payload.roles = ['user'];
    return generateToken(payload, this.loginExpirationTime);
  }

  async prepareRegisterTokens(token: string, mobileNumber: string) {
    const tempTokenKey = `tempToken_${mobileNumber}`;
    const tokenKey = `token_${mobileNumber}`;
    const tokenPromises = [
      this.cacheManager.del(tempTokenKey),
      this.cacheManager.set(tokenKey, token, this.loginExpirationTime * 1000),
    ];
    await Promise.allSettled(tokenPromises);
  }

  async login(loginInput: loginDto) {
    const { password, mobileNumber } = loginInput;
    let user = await this.UserModel.findOne({ mobileNumber }).exec();

    if (!user || user.password != password) {
      throw errors.wrongUserOrPass;
    } else {
      const token = this.generateToken({ mobileNumber });
      await this.#prepareLoginToken(token, mobileNumber);
      return token;
    }
  }

  async #prepareLoginToken(token: string, id: string) {
    const tokenKey = `token_${id}`;
    await this.cacheManager.set(
      tokenKey,
      token,
      this.loginExpirationTime * 1000,
    );
  }

  async alreadyLoggedInOrNot(mobileNumber) {
    const tokenKey = `token_${mobileNumber}`;
    return await this.cacheManager.get(tokenKey);
  }

  async logout(token) {
    const payload = await getTokenPayload(token);
    const tokenKey = `token-${payload.mobileNumber}`;
    await this.cacheManager.del(tokenKey);
  }
}
