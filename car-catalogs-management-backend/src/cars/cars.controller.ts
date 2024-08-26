import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpException, HttpStatus, UsePipes, Request } from '@nestjs/common';
import { CarsService } from './cars.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    async findAll() {
        try {
            return await this.carsService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    async findAllForUser(@Request() req: any) {
        try {            
            return await this.carsService.findAllForUser(req.user.id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const car = await this.carsService.findOne(id);
            if (!car) {
                throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
            }
            return car;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async create(@Body() createCarDto: CreateCarDto, @Request() req: any) {
        try {
            return await this.carsService.create(createCarDto, req.user.id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto, @Request() req: any) {
        try {
            return await this.carsService.update(id, updateCarDto, req.user.id);            
        } catch (error) {            
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: string, @Request() req: any) {
        try {
            const result = await this.carsService.delete(id, req.user.id);
            if (!result) {
                throw new HttpException('Car not found or failed to delete', HttpStatus.NOT_FOUND);
            }
            return { message: 'Car successfully deleted' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}