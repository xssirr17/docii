import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Doctor } from '../schema/doctor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDoctorDto } from '../dtos/updateDoctor.dto';
import { DeleteDoctorDto } from '../dtos/deleteDoctor.dto';
import errors from 'src/constants/errors';
import { Category } from 'src/modules/category/schema/category.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(input) {
    if (await this.#existOrNot(input.nationalId)) {
      throw errors.alreadyExist;
    } else if (await this.#categoryExistOrNot(input.categories)) {
      throw errors.categoryNotFound;
    }
    const doctorInfo = { ...input };
    const date: Date = new Date();
    doctorInfo.score = 0;
    doctorInfo.followers = 0;
    doctorInfo.joinAt = date;
    const doctorModel = new this.doctorModel(doctorInfo);
    return doctorModel.save();
  }
  async delete(input: DeleteDoctorDto) {}
  async update(input: UpdateDoctorDto) {}
  async get({ id, page, sortBy, sortType }) {
    return {};
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
}
