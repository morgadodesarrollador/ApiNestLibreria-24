import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  register(registerdto: RegisterAuthDto) {
    return 'This action adds a new auth';
  }

 
}
