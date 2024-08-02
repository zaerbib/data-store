import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s'}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
