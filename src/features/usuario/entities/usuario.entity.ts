import { Pedido } from "src/features/pedido/entities/pedido.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'usuario'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length:11,
        nullable: true
    })
    telefone: string

    @Column({
        length:200,
        nullable: true
    })
    chavepix: string

    @Column({
        length:11,
        nullable: false,
        unique: true
    })
    cpf: string

    @Column({
        length:200,
        nullable: false
    })
    name: string

    @Column({
        default: true,
        nullable: false
    })
    active: boolean

    @OneToMany(() => Pedido, (pedido)=> pedido.empresa)
    pedidos: Pedido[]

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string
}
