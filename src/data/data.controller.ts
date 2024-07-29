import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { Data } from './interfaces/data.interfaces';


@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  async create(@Body() createDatumDto: CreateDatumDto): Promise<Data> {
    return this.dataService.create(createDatumDto);
  }

  @Get()
  async findAll(): Promise<Data[]> {
    return this.dataService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Data> {
    return this.dataService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDatumDto: CreateDatumDto): Promise<Data> {
    return this.dataService.update(id, updateDatumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Data> {
    return this.dataService.remove(id);
  }
}
