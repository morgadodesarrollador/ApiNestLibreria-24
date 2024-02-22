import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { Rol } from './entities/rol.entity';
import { RolRepository } from './entities/rol.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, Rol, RolRepository])
  ],

  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
