import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from './user.entity';

@Entity({
    name:'ROLES'
})
export class Rol {
    @PrimaryGeneratedColumn('uuid',{
        name: 'id'
    })
    id: string;

    @Column('varchar', {
        name: 'name',
        nullable: true,
        unique: false,
        default: 'usuario',
        length: 100,
    })
    name: string;

    @Column('varchar', {
        name: 'description',
        nullable: true,
        unique: false,
        length: 255,
    })
    description: string;

    @CreateDateColumn({
        name: 'create_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'update_at'
    })
    updatedAt: Date;

    @OneToMany(
        () => User, 
        user => user.rol    
    )
    user: User
}