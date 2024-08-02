import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PublicGuard } from './common/guards/public.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';


@Module({
  imports: [
    DataModule, 
    UsersModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/data-store'), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PublicGuard,
    RolesGuard
  ],
  
})
export class AppModule {}
