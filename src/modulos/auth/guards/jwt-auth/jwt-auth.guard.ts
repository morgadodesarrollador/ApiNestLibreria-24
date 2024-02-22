import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//intentamos verificar la autenticación tipo 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}

