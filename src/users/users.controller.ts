import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './dto/user.dto';
import { Roles } from '../common/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['user'])
  async create(@Body() createUserDto: UserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':login')
  async findByLogin(@Param('login') login: string) {
    return await this.usersService.findByLogin(login);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return await this.usersService.updateById(id, updateUserDto);
  }

  @Patch(':login')
  async updateByLogin(@Param('login') login: string, @Body() updateUserDto: UserDto) {
    return await this.usersService.updateByLogin(login, updateUserDto);
  }

  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return await this.usersService.removeById(id);
  }

  async removeByLogin(@Param('login') login: string) {
    return await this.usersService.removeByLogin(login);
  }
}
