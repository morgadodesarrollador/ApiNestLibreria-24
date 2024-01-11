import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User>{
    private logger:Logger = new Logger(UserRepository.name);

    async findByUsername(username: string){
        try{
          return await this.createQueryBuilder('USERS')
                  .where(`USERS.user_name = :value`, {value: username})
                  .getOne()
        }catch(error){
          this.logger.error(error);
          throw new InternalServerErrorException('Error finding user by name')
        }
      }

      async findByEmail(email: string){
        try{
          return await this.createQueryBuilder('USERS')
                  .where(`USERS.email = :value`, {value: email})
                  .getOne()
        }catch(error){
          this.logger.error(error);
          throw new InternalServerErrorException('Error finding user by email')
        }
      }
    
}