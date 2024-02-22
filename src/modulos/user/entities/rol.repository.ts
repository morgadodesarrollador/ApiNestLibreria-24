import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Rol } from "./rol.entity";

@Injectable()
@EntityRepository(Rol)
export class RolRepository extends Repository<Rol>{
    private logger = new Logger(RolRepository.name);

    constructor (private datasource: DataSource){
        super(Rol, datasource.createEntityManager())
    }

    async findDefaultRole(defaultRole = 'User'){
        try{
            return await 
                this.createQueryBuilder('ROLES')
                .where('ROLES.name = :value', {value: defaultRole})
                .getOne()
        }catch(error){
            this.logger.error(error);
            throw new InternalServerErrorException('Error finding default role')
        }
    }
}