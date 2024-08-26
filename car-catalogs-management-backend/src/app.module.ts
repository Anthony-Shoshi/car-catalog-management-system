import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/db-car-catalogs-management'),
    AuthModule,    
    CarsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
