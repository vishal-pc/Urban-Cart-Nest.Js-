import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaDefine } from './models/user.model';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AdminModule } from 'src/admin/admin.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/middleware/token/jwt.strategy';
import { envConfig } from 'src/config/envConfig';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchemaDefine }]),
    AdminModule,
    JwtModule.register({
      secret: envConfig.Jwt_Secret,
      signOptions: { expiresIn: envConfig.Jwt_Expiry_Hours },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],
})
export class UserModule {}
