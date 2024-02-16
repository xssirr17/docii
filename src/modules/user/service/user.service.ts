import { Injectable } from '@nestjs/common';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class userService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

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
}
