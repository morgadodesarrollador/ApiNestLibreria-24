import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/entities/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import { join } from 'path';
import { RolRepository } from '../user/entities/rol.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

const  PRIVATE_KEY = fs.readFileSync(
  join(process.cwd(), '/certs/keypair.pem')
);

const  PUBLIC_KEY = fs.readFileSync(
  join(process.cwd(), '/certs/publickey.crt')
)
@Module({
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    PassportModule.register({ defaultStrategy:'jwt'}),
    //configuramos el JWT
    // JwtModule.register({
    //   //--- privateKey: PRIVATE_KEY,
    //   //--- publicKey: PUBLIC_KEY,
    //   secret: 'claveSecreta123',
    //   signOptions:{
    //     expiresIn: '1h',
    //     algorithm: 'HS256'
    //   }
    // })
    //debido a la espera de leer el fichero .env
    JwtModule.registerAsync({
      imports:[ ConfigModule ],
      inject:[ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
            algorithm: 'HS256'
          }
        }
      }  
    })

  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, RolRepository, JwtStrategy, ConfigService],
  exports: [ ConfigService ]
})
export class AuthModule {
  constructor (){
   // console.log(PUBLIC_KEY, PRIVATE_KEY)
  }
}
