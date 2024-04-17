import { Empresa } from "src/features/empresas/entities/empresa.entity"
import { Usuario } from "src/features/usuarios/entities/usuario.entity"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name: 'pedidos'})
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

    @ManyToOne(() => Empresa, (empresa) => empresa.pedidos)
    empresa:Empresa    

    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
    usuario:Usuario    

    @CreateDateColumn()
    createdAt : string

    @UpdateDateColumn()
    updatedAt : string

  
}
