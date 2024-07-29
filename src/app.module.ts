import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DataModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/data-store')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
