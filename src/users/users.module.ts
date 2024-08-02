import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { User } from './entities/user.entity';
import { UserRequestMiddleware } from 'src/common/user-request/user-request.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PublicGuard } from 'src/common/guards/public.guard';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }, 
    {
      provide: APP_GUARD,
      useClass: PublicGuard
    }
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserRequestMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }  
}
