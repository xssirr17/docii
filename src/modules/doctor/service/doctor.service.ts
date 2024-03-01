import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Doctor } from '../schema/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDoctorDto } from '../dtos/updateDoctor.dto';
import { DeleteDoctorDto } from '../dtos/deleteDoctor.dto';
import errors from 'src/constants/errors';
import { Category } from 'src/modules/category/schema/category.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DoctorService {
  private pageLimit: number;
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {
    this.pageLimit = 10;
  }
  async create(input) {
    if (await this.#existOrNot(input.nationalId)) {
      throw errors.alreadyExist;
    } else if (await this.#categoryExistOrNot(input.categories)) {
      throw errors.categoryNotFound;
    }
    const doctorInfo = { ...input };
    const date: Date = new Date();
    doctorInfo.score = 0;
    doctorInfo.followers = [];
    doctorInfo.joinAt = date;
    doctorInfo.id = uuidv4();
    const doctorModel = new this.doctorModel(doctorInfo);
    return doctorModel.save();
  }
  async delete(input: DeleteDoctorDto) {
    return await this.doctorModel.deleteOne({ id: input.id });
  }
  async update(input: UpdateDoctorDto) {
    return await this.doctorModel.updateOne({ id: input.id }, input);
  }
  async get({ id, page, sortBy, sortType }) {
    if (id) {
      return await this.#getById(id);
    } else {
      return await this.#getAll({ page, sortBy, sortType });
    }
  }

  async #existOrNot(nationalId: string) {
    const result: object[] = await this.doctorModel.find({ nationalId });
    return !!result.length;
  }
  async #categoryExistOrNot(categoriesName: Array<string>) {
    const categories = await Promise.all(
      categoriesName.map((item) => {
        return this.categoryModel.find({
          name: item,
        });
      }),
    );

    const result: boolean = categories.every((item) => item[0]);

    return !result;
  }

  async #getById(id: string) {
    return await this.doctorModel.find({ _id: id });
  }
  async #getAll({ page, sortBy, sortType }) {
    if (page && sortBy && sortType) {
      return await this.#getAllWithPaginationAndSort(page, sortBy, sortType);
    } else if (sortBy && sortType && !page) {
      return await this.#getAllWithSort(sortBy, sortType);
    } else if (page) {
      return await this.#getAllWithPagination(page);
    }
    return await this.doctorModel.find();
  }

  async #getAllWithPagination(page) {
    return await this.doctorModel
      .find()
      .limit(this.pageLimit)
      .skip(page * this.pageLimit - this.pageLimit)
      .exec();
  }
  async #getAllWithPaginationAndSort(page, sortBy, sortType) {
    return await this.doctorModel
      .find()
      .sort({ [sortBy]: sortType })
      .limit(this.pageLimit)
      .skip(page * this.pageLimit)
      .exec();
  }

  async #getAllWithSort(sortBy, sortType) {
    return await this.doctorModel
      .find()
      .sort({ [sortBy]: sortType })
      .exec();
  }
}
