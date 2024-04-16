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

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        length:11
    })
    cpf: string

    @Column()
    role: number

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

}
