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
        length:127,
        nullable: false
    })
    name: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string
    
    @Column({
        select: false,
        nullable: false
    })
    password: string

    @Column({
        length:11,
        unique: true,
        nullable: false
    })
    cpf: string

    @Column({
        nullable: false,
        default: 1
    })
    role: number

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

}
