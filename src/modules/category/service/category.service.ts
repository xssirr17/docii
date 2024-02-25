import { HttpException, Injectable } from '@nestjs/common';
import { Category } from '../schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import errors from 'src/constants/errors';
import { AddCategoryDto } from '../dtos/add.dto';
import { DeleteCategoryDto } from '../dtos/delete.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async get(id: string) {
    if (id) {
      const data = await this.#getById(id);
      if (data.length) {
        return data;
      }
      throw errors.notFound;
    }
    return await this.#getAll();
  }
  async update(input) {
    return await this.categoryModel.updateOne({ name: input.name }, input);
  }
  async delete(input: DeleteCategoryDto) {
    return await this.categoryModel.deleteOne({ name: input.name });
  }
  async add(input: AddCategoryDto) {
    const existOrNot = await this.#getById(input.name);
    if (existOrNot.length) {
      throw errors.alreadyExist;
    }
    const data = new this.categoryModel(input);
    return data.save();
  }

  async #getById(name: string) {
    return await this.categoryModel.find({ name });
  }
  async #getAll() {
    return await this.categoryModel.find();
  }
}
