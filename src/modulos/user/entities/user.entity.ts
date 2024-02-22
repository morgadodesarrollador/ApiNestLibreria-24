import { Column, CreateDateColumn, Entity, JoinColumn, JsonContains, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Length } from 'class-validator';
import { Rol } from "./rol.entity";

@Entity({
    name:'USERS'
})
export class User {

    @PrimaryGeneratedColumn('uuid',{
        name: 'id'
    })
    id: string;

    @Column('text', {
        name: 'email',
        nullable: false,
        unique: true,
        //length: 255
    })
    email: string;

    @Column('varchar', {
        name: 'username',
        nullable: false,
        unique: true,
        length: 150
    })
    username: string;

    @Column('varchar', {
        name: 'password',
        nullable: false,
        unique: false,
        length: 255,
    })
    password: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        //dto -> ['invitado', 'usuario', 'gestor', 'administrador']
        default: ['usuario']
    })
    roles: string[];

    @Column('varchar', {
        name: 'logo',
        nullable: true,
        unique: false,
        length: 150,
    })
    logo: string; //ruta relativa a "public/images"

    //redes sociales
    @Column('varchar', {
        name: 'instagram',
        nullable: true,
        unique: false,
        length: 150,
    })
    instagram: string;

    
    @CreateDateColumn({
        name: 'create_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'update_at'
    })
    updatedAt: Date;

    //relación de 1 a 1 de Auth(User) <---> Cliente
    //cliente: Cliente; 

    @ManyToOne(
        () => Rol,
        rol => rol.user
    )
    @JoinColumn({ name: 'rol_id'})
    rol : Rol
}
