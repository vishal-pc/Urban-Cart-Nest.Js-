import {
  Body,
  Controller,
  UseGuards,
  Req,
  Res,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from '../services/user.service';
import { emailValidate, passwordRegex } from 'src/helpers/helper';
import { RoleService } from 'src/admin/services/role.service';
import {
  ErrorMessages,
  StatusCodes,
  SuccessMessages,
} from 'src/validation/responseMessages';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/token/role.guard';
import { Roles } from 'src/middleware/token/role.decorator';

@Controller('api/v1')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post('register')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const requiredFields = ['fullName', 'email', 'password'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields.join(', ');
        return res.status(StatusCodes.ClientError.BadRequest).json({
          message: ErrorMessages.MissingFields(missingFieldsMessage),
        });
      }

      if (!emailValidate(email)) {
        return res
          .status(StatusCodes.ClientError.BadRequest)
          .json({ message: ErrorMessages.EmailInvalid });
      }

      const existingUser = await this.userService.findUserEmail(email);
      if (existingUser) {
        return res
          .status(StatusCodes.ClientError.BadRequest)
          .json({ message: ErrorMessages.UserExists(email) });
      }

      if (!passwordRegex.test(password)) {
        return res.status(StatusCodes.ClientError.BadRequest).json({
          message: ErrorMessages.PasswordRequirements,
        });
      }

      const defaultRole = await this.roleService.findUserRole();

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userService.create({
        fullName,
        email,
        password: hashedPassword,
        role: defaultRole._id.toString(),
        userLogin: false,
        IsAdmin: false,
      });

      return res
        .status(StatusCodes.Success.Created)
        .json({ message: SuccessMessages.RegisterSuccess });
    } catch (error) {
      console.error('Error in user register', error);
      return res.status(StatusCodes.ServerError.InternalServerError).json({
        message: ErrorMessages.SomethingWentWrong,
      });
    }
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const requiredFields = ['email', 'password'];
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields.join(', ');
        return res.status(StatusCodes.ClientError.BadRequest).json({
          message: ErrorMessages.MissingFields(missingFieldsMessage),
        });
      }

      const findUser = await this.userService.findUserEmail(email);
      if (!findUser) {
        return res
          .status(StatusCodes.ClientError.NotFound)
          .json({ message: ErrorMessages.UserNotFound });
      }

      const isPasswordMatch = await bcrypt.compare(password, findUser.password);
      if (!isPasswordMatch) {
        return res
          .status(StatusCodes.ClientError.BadRequest)
          .json({ message: ErrorMessages.IncorrectCredentials });
      }

      await this.userService.findUserAndUpdateLoginStatus(findUser?._id);

      const token = await this.userService.generateAuthToken(
        findUser._id,
        findUser.fullName,
        findUser.email,
        findUser.role,
        findUser.userLogin,
        findUser.IsAdmin,
      );

      return res
        .status(StatusCodes.Success.Ok)
        .json({ message: SuccessMessages.SignInSuccess, token: token });
    } catch (error) {
      console.error('Error in user login', error);
      return res.status(StatusCodes.ServerError.InternalServerError).json({
        message: ErrorMessages.SomethingWentWrong,
      });
    }
  }

  @Get('getUser/:id')
  @UseGuards(AuthGuard('logintoken'), RolesGuard)
  @Roles('user')
  async getUserProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        return res.status(StatusCodes.ClientError.NotFound).json({
          message: ErrorMessages.UserNotFound,
        });
      }
      const userData = {
        _id: user.id,
        fullName: user.fullName || 'No User',
        email: user.email || 'No Email',
        phone: user.phone || 0,
        profileImg: user.profileImg || 'No Image',
        address: user.address || 'No Address',
        userLogin: user.userLogin || false,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(StatusCodes.Success.Ok).json({
        message: SuccessMessages.UserFound,
        user: userData,
      });
    } catch (error) {
      console.error('Error in getting user profile', error);
      return res.status(StatusCodes.ServerError.InternalServerError).json({
        message: ErrorMessages.SomethingWentWrong,
        success: false,
      });
    }
  }
}
