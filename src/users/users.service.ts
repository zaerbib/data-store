import { Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByLogin(login: string): Promise<User> {
    return this.userModel.findById(login);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateByLogin(login: string, updateUserDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(login, updateUserDto, {new : true});
  }

  async updateById(id: string, updateUserDto: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
  }

  async removeByLogin(login: string): Promise<User> {
    return this.userModel.findByIdAndDelete(login);
  }

  async removeById(id: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id);
  }
}
