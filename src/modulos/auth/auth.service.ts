import { Injectable, Logger, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user/entities/user.repository';
import { RegisterAuthDto } from "./dto/register.dto";
import { LoginAuthDto } from './dto/login.dto';
import { User } from "../user/entities/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RolRepository } from '../user/entities/rol.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepòsitory: UserRepository,
    private readonly rolRepository: RolRepository,
    private readonly jwtService:  JwtService
  ){}

  async login(loginDto: LoginAuthDto){
      const usuario = await this.userRepòsitory.findByEmail(loginDto.email);
      if (!usuario){
        throw new NotFoundException('Usuario no existe')
      }
      let isValidPassword;
      try{
        isValidPassword = await this.isMatch(loginDto.password, usuario.password)
        //bcrypt.compare(loginDto.password, usuario.password)
      }catch(error){
        throw new InternalServerErrorException('error validar password')
      }
      if (isValidPassword){
        //return 'Login success'
        return {
          msg: 'Usuario validado',
          status: 200,
          data: usuario,
          token: this.getAccessToken(usuario)
        }
        
      }else{
        return 'Login not success'
      }
  }


  async register(registerDto: RegisterAuthDto){
    if (await this.userRepòsitory.findByEmail(registerDto.email)){
      throw new BadRequestException('El email existe en la Base de Datos')
    }
    if (await this.userRepòsitory.findByUsername(registerDto.username)){
      throw new BadRequestException('El username existe en la Base de Datos')
    }
    console.log('el email ', registerDto.email, ' no existe en la BD');
    try{
      registerDto.password = await this.getHash(registerDto.password);
    }catch(error){
      throw new InternalServerErrorException('Error al crear el hassing del password')
    }
    try{
      const defaultRol = await this.rolRepository.findDefaultRole();
      const usuario = this.userRepòsitory.create ({
        ...registerDto,
        rol: defaultRol
      });
      const userCreated =  await this.userRepòsitory.save(usuario);
      const { password, createdAt, updatedAt, ...user } = userCreated;
      return {
        user: user,
        token : this.getAccessToken(userCreated)
      }
    }catch (error){
      throw new InternalServerErrorException('Error al crear el nuevo usuario')
    }
  }

  async getHash (password: string){
    return await bcrypt.hash(password, 10);
  }

  async isMatch (password: string, hash: string){
    return await bcrypt.compare(password, hash)
  }
  
  private getAccessToken(user: User){
    // console.log(user);
    // console.log(process.env.JWT_SECRET)
    
    try{
      //crea el token con los campos del user seleccionadps
      //y la configuración del JwtModule.register()
      const accessToken = this.jwtService.sign({
        id: user.id,
        name: user.username,
        email: user.email,
        //rol: user.roles[0],
     //   create: user.createdAt
      });
      return {
        token: accessToken
      }
    }catch(error){
      console.log(error);
      throw new InternalServerErrorException('Error al crear el token')
    }
    
  }
}
