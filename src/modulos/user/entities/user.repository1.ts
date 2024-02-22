import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UserRepository extends Repository<User>{
    private logger:Logger = new Logger(UserRepository.name);
    constructor(private dataSource: DataSource) {
      console.log('Constructos User');  
      super(User, dataSource.createEntityManager());
    }
    async findByUsername(username: string){
        try{
          return await this.createQueryBuilder('USERS')
                  .where(`USERS.username = :value`, {value: username})
                  .getOne()
        }catch(error){
          this.logger.error(error);
          throw new InternalServerErrorException('Error finding user by name')
        }
      }
      async findByEmail(email: string){
        console.log("-->", email)
        try{
          return await this.createQueryBuilder('USERS')
                  .where(`email = :value`, {value: email})
                  .getOne()
        }catch(error){
          this.logger.error(error);
          throw new InternalServerErrorException('Error finding user by email')
        }
      }
}