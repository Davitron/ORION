import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class QueryService {
  static async create<T>(dto: any, model: any): Promise<T> {
    const createdModel = model(dto);
    return await createdModel.save();
  }

  static async findAll<T>(model: any): Promise<T[]> {
    return await model.find().exec();
  }

  static async findOne<T>(model: any, query: any, select?: any): Promise<T> {
    return await model.findOne(query, select);
  }

  static async findAndUpdate<T>(model: any, filter: any, update: any, select?: any): Promise<T> {
    return await model.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}
