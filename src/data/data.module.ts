import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema } from './schema/data.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema}])],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
