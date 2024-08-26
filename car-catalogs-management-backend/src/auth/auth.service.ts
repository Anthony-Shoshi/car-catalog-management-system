import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const { username, email, password } = createUserDto;

        const existingUserName = await this.userModel.findOne({ username: createUserDto.username });
        if (existingUserName) {
            throw new HttpException('Username already exists', 400);
        }

        const existingUserEmail = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUserEmail) {
            throw new HttpException('Email already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const { email, password } = loginUserDto;
        const user = await this.userModel.findOne({ email });
        if (!user) throw new HttpException('User not exists', 400);

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
