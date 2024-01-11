import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

 
}
