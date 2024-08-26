import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Car } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    constructor(@InjectModel(Car.name) private carModel: Model<Car>) { }

    async create(createCarDto: CreateCarDto, userId: string): Promise<Car> {
        const createdCar = new this.carModel({ ...createCarDto, user: userId });
        return createdCar.save();
    }

    async findAll(): Promise<Car[]> {
        return this.carModel.find();
    }

    async findAllForUser(userId: string): Promise<Car[]> {
        return this.carModel.find({ user: userId });
    }

    async findOne(id: string): Promise<Car> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("Invalid ID", 404);

        const car = await this.carModel.findById(id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }

    async update(id: string, updateCarDto: UpdateCarDto, userId: string): Promise<Car> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("Invalid ID", 404);

        const car = await this.carModel.findById(id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }

        if (car.user.toString() !== userId) {
            throw new ForbiddenException('You are not authorized to delete this car');
        }

        return await this.carModel.findByIdAndUpdate(id, updateCarDto, { new: true });
    }

    async delete(id: string, userId: string): Promise<Car | null> {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException("Invalid ID", 404);

        const car = await this.carModel.findById(id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }

        if (car.user.toString() !== userId) {
            throw new ForbiddenException('You are not authorized to delete this car');
        }

        return await this.carModel.findByIdAndDelete(id);
    }
}
