import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto){
    console.log(loginAuthDto)
    return this.authService.login(loginAuthDto);
  }
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
