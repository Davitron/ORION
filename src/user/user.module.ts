import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModel} from './model/user.model';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { QueryModule } from '../query/query.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    QueryModule,
    MailerModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
