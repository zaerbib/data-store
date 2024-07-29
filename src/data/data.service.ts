import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './interfaces/data.interfaces';

@Injectable()
export class DataService {
  constructor(@InjectModel('Data') private readonly dataModel: Model<Data>) {}

  async create(createDatumDto: CreateDatumDto): Promise<Data> {
    const newData = new this.dataModel(createDatumDto);
    return await newData.save();
  }

  async findAll(): Promise<Data[]> {
    return await this.dataModel.find();
  }

  async findOne(id: string): Promise<Data> {
    return await this.dataModel.findById(id);
  }

  async update(id: string, updateDatumDto: CreateDatumDto): Promise<Data> {
    return await this.dataModel.findByIdAndUpdate(id, updateDatumDto, { new: true});
  }

  async remove(id: string): Promise<Data> {
    return this.dataModel.findByIdAndDelete(id);
  }
}
