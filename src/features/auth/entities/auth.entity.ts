import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Auth {
    @PrimaryColumn()
    id: number

    @Column({
        length:127
    })
    name: string

    @Column({})
    email: string

    @Column()
    password: string

    @Column({
        length:11
    })
    cpf: number

    @Column()
    role: number

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

}
