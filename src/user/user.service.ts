import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { CreateUserDto } from './Dto/create-user.dto';
import { AuthUserDto } from './Dto/auth-user.dto';
import { UpdatePasswordDto } from './Dto/update-password.dto';
import { QueryService } from '../query/query.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async getUserForAuth(authUser: AuthUserDto): Promise<any> {
    return await QueryService
    .findOne(this.userModel,
      {email: authUser.email},
      { email: 1, _id: 1, password: 1},
    );
  }

  async comparePassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }

  async provideToken(user: any): Promise<any> {
    const { _id, email } = user.toJSON();
    const payload = { id: _id, email };
    return await this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  async addNewUser(newUser: CreateUserDto): Promise<User> {
    return await QueryService.create(newUser, this.userModel);
  }

  async authUser(authUser: AuthUserDto): Promise<any> {
    const user = await this.getUserForAuth(authUser);
    if (!user || await this.comparePassword(authUser.password, user.password) === false) {
      throw new BadRequestException();
    }
    return await this.provideToken(user);
  }

  async sendForgotPassword(userEmail: string): Promise<any> {
    const token = await this.jwtService.sign({email: userEmail}, { expiresIn: '1d' });
    const email: any = {
      to: userEmail,
      from: 'test@mail.com',
      subject: 'Reset Your Password',
      html: `<p>This is a <a href='http://localhost:3000/resetPassword?token=${token}'>Test</a> mail </p>`,
    };
    try {
      await this.mailService.sendMail(email);
      return "mail sent";
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async updatePassword(update: UpdatePasswordDto): Promise<any> {
    const { email,  password } = update;
    return await QueryService.findAndUpdate(this.userModel, { email }, {password}, { email: 1, _id: 1, password: 1});
  }
}
