import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from '../../libros/entities/libro.entity';

@Entity()
export class Categoria {

//    @PrimaryGeneratedColumn('uuid')
//    id:string;
   @PrimaryColumn()
   cod: string;

   @Column('text', {unique: true})
   name: string;

   @Column('text')
   descripcion: string;

   @Column('text')
   logo: string


    @OneToMany(
        () => Libro,
        (Libro) => Libro.categoria,
        { cascade: false }
    )
    libros?:Libro[]

}