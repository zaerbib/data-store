import { Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UserExist } from '../common/exception-filters/user-exist.exception';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const user: User = await this.findByLogin(createUserDto.login);
    if(user) {
      throw new UserExist(`Login ${user.login} already exist !`);
    }

    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findByLogin(login: string): Promise<User> {
    return this.userModel.findOne({login: login});
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ uniqueId: id});
  }

  async updateByLogin(login: string, updateUserDto: UserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ login: login}, updateUserDto, {new : true});
  }

  async updateById(id: string, updateUserDto: UserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ uniqueId: id}, updateUserDto, {new: true});
  }

  async removeByLogin(login: string): Promise<User> {
    return this.userModel.findOneAndDelete({ login: login});
  }

  async removeById(id: string): Promise<User> {
    return this.userModel.findOneAndUpdate({ uniqueId: id});
  }
}
