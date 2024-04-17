import { Pedido } from "src/features/pedidos/entities/pedido.entity";
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
    })
    telefone:number

    @Column({
        nullable:true,
    })
    cep:number
    
    @Column({
        nullable:true,
    })
    endereco:number
    
    @Column({
        nullable:true,
    })
    logradouro:number

    @Column({
        nullable:true,
    })
    numero:number

    @Column({
        nullable:true,
    })
    complemento:number

    @OneToMany(() => Pedido, (pedido)=> pedido.empresa)
    pedidos: Pedido[]

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string
}
