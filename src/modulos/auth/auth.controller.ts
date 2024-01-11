import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login

  //register
  @Post('register')
  register(@Body() registerdto: RegisterAuthDto){
    console.log(registerdto);
    return this.authService.register(registerdto);
  }
  //logout

  //checkToken

  //perfil
}
