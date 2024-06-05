import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleService } from 'src/admin/services/role.service';
import {
  ErrorMessages,
  StatusCodes,
  SuccessMessages,
} from 'src/validation/responseMessages';

@Controller('api/v1')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('role')
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body('role') role: string,
  ) {
    try {
      const findeExistingRole = await this.roleService.findRole(role);
      if (findeExistingRole) {
        return res
          .status(StatusCodes.ClientError.BadRequest)
          .json({ message: ErrorMessages.RoleExist });
      }

      await this.roleService.create({
        role,
      });

      return res
        .status(StatusCodes.Success.Created)
        .json({ message: SuccessMessages.RoleCreated });
    } catch (error) {
      console.error('Error in register', error);
      return res.status(StatusCodes.ServerError.InternalServerError).json({
        message: ErrorMessages.SomethingWentWrong,
      });
    }
  }
}
