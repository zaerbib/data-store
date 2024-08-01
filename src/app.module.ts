import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [DataModule, UsersModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/data-store'), UsersModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
