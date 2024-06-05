import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserInfo } from './../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/config/envConfig';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInfo>,
    private jwtService: JwtService,
  ) {}

  async create(userData: {
    fullName: string;
    email: string;
    password: string;
    role: mongoose.Schema.Types.ObjectId;
    userLogin: boolean;
    IsAdmin: boolean;
  }) {
    const createdUser = new this.userModel(userData);
    return await createdUser.save();
  }

  async generateAuthToken(
    id: any,
    fullName: string,
    email: string,
    role: any,
    userLogin: boolean,
    IsAdmin: boolean,
  ) {
    const payload = {
      userId: id,
      fullName,
      email,
      role: role,
      userLogin,
      IsAdmin,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: envConfig.Jwt_Expiry_Hours,
      secret: envConfig.Jwt_Secret,
    });
    return accessToken;
  }

  async findUserEmail(email: string) {
    return await this.userModel
      .findOne({ email })
      .populate('role', '_id role')
      .exec();
  }

  async findUserById(id: any) {
    return await this.userModel
      .findById(id)
      .populate('role', '_id role')
      .exec();
  }

  async findUserAndUpdateLoginStatus(_id: any) {
    return await this.userModel
      .findByIdAndUpdate(_id, { userLogin: true }, { new: true })
      .exec();
  }
}
