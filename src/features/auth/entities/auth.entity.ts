import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: `auth`
})
export class Auth {
    @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length:127
    })
    name: string

    @Column({
        unique: true
    })
    email: string
    
    @Column({
        select: false,

    })
    password: string

    @Column({
        length:11,
        unique: true
    })
    cpf: string

    @Column()
    role: number

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

}
