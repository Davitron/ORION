import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { QueryModule } from './query/query.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { MailerModule } from './mailer/mailer.module';

const config = new ConfigService('.env');

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(config.get('DATABASE_URL'), { useNewUrlParser: true }),
    UserModule,
    QueryModule,
    InterceptorsModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
