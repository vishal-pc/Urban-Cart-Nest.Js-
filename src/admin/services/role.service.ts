import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInfo } from './../models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<RoleInfo>,
  ) {}

  async create(roleData: { role: string }) {
    const createdRole = new this.roleModel(roleData);
    return await createdRole.save();
  }

  async findUserRole(): Promise<RoleInfo | null> {
    return await this.roleModel.findOne({ role: 'user' }).exec();
  }

  async findRole(role: string): Promise<RoleInfo | null> {
    return await this.roleModel.findOne({ role }).exec();
  }
}
