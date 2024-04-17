import { Pedido } from "src/features/pedido/entities/pedido.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'empresa'
})
export class Empresa {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({
     nullable: false
    })
    name: string

    @Column({
        nullable:false,
        length: 14
    })
    documento:string

    @Column({
        nullable:true,
        length:11
    })
    telefone:string

    @Column({
        nullable:true,
        length:14
    })
    cep:number
    
    @Column({
        nullable:true,
        length:300
    })
    endereco:string
    
    @Column({
        nullable:true,
        length:300
    })
    logradouro:string

    @Column({
        nullable:true,
        length:11
    })
    numero:number

    @Column({
        nullable:true,
        length:200
    })
    complemento:string

    @OneToMany(() => Pedido, (pedido)=> pedido.empresa)
    pedidos: Pedido[]

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string
}
