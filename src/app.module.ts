import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConnection from './config/dbConfig';
import { UserModule } from './auth/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [dbConnection, UserModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
