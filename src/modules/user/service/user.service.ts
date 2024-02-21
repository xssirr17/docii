import { Injectable, Inject } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateToken } from 'src/helpers/generateToken';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import errors from 'src/constants/errors';

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

  generateToken(payload: object): string {
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

  async login(loginInput) {
    const { password, mobileNumber, nationalId } = loginInput;
    let id = mobileNumber ? 'mobileNumber' : 'nationalId';
    let user = await this.UserModel.findById({ [id]: loginInput[id] });

    if (!user || user.password != password) {
      throw errors.wrongUserOrPass;
    }

    const token = this.generateToken({ [id]: loginInput[id] });
    await this.#prepareLoginToken(token, id);
    return token;
  }

  async #prepareLoginToken(token: string, id: string) {
    const tokenKey = `token_${id}`;
    await this.cacheManager.set(
      tokenKey,
      token,
      this.loginExpirationTime * 1000,
    );
  }
}
