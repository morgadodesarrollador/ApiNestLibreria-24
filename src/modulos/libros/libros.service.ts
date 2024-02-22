import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';
import { Autore } from '../autores/entities/autore.entity';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LibrosService {
  
  constructor(
    @InjectRepository(Libro)
    private readonly librosRepository: Repository<Libro>,
    private readonly autoresServie: AutoresService
    ){

  }
  async create(createLibroDto: CreateLibroDto) {
    try{
        const {autor, ...campos } = createLibroDto; //ES6
        const libro = this.librosRepository.create({...campos});
        const autorobj = await this.autoresServie.findOne(autor);
        libro.autor = autorobj; //direccion del objeto autor relacionado
        console.log(libro);
        await this.librosRepository.save(libro);
    
        return {
          status: 200,
          data: libro,
          msg: 'Libro insertado correctamente'
        };
    }catch(error){
      return new InternalServerErrorException('Error en BD');
    }
    
  }

  findAll() {
    const libros = this.librosRepository.find({
      relations: {
        autor:true,
        categoria: true
      }
    });
    return libros;
  }

  findOne(isbn: string) {
    const autor= this.librosRepository.findOne({
      where:{
        isbn
      },
      relations: {
        autor: true,
        categoria: true
      }
    });
    return autor;
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }
  async deleteAllLibros(){
    const query = this.librosRepository.createQueryBuilder('libro');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin ...')
    }
  }
}
