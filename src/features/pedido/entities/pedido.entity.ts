import { Empresa } from "src/features/empresa/entities/empresa.entity"
import { Usuario } from "src/features/usuario/entities/usuario.entity"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'pedido'})
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable:false,

    })
    remessa: string

    @Column({
        nullable:false,
    })
    valor: number

    @Column({
        nullable:false,
    })
    quantidade: number

    @Column({
        nullable:false,
    })
    modelo: string

    @Column({
        nullable:true,
    })
    descricao: string

    @Column({
        nullable:true,
    }) 
    dataFinalizacao: Date

    @ManyToOne(() => Empresa, (empresa) => empresa.pedidos, {
        nullable:false
    })
    empresa:Empresa    

    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, {
        nullable:false,
    })
    usuario:Usuario    

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

  
}
