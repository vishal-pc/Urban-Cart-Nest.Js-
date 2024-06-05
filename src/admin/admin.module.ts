import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchemaDefine } from './models/role.model';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchemaDefine }]),
  ],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class AdminModule {}
