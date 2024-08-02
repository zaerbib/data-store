import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema } from './schema/data.schema';
import { UpdateRequestMiddleware } from 'src/common/update-request/update-request.middleware';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Data', schema: DataSchema}])],
  controllers: [DataController],
  providers: [
    DataService
  ],
})
export class DataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UpdateRequestMiddleware)
      .forRoutes({ path: 'data', method: RequestMethod.POST });
  }
}
