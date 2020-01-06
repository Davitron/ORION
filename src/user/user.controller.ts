import { Controller, Get, Param, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { AuthUserDto } from './Dto/auth-user.dto';
import { UpdatePasswordDto } from './Dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async addNewUser(@Body() newUser: CreateUserDto) {
    const payload = await this.userService.addNewUser(newUser);
    return payload;
  }

  @Post('login')
  async authUser(@Body() authUser: AuthUserDto) {
    const payload = await this.userService.authUser(authUser);
    return { token: payload };
  }

  @Post('forgotpassword')
  async forgotPassowrd(@Body() userEmail: string) {
    return await this.userService.sendForgotPassword(userEmail);
  }

  @Post('resetpassword')
  async resetpassword(@Body() update: UpdatePasswordDto) {
    return await this.resetpassword(update);
  }
}
