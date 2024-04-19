import { Empresa } from "src/features/empresa/entities/empresa.entity"
import { Usuario } from "src/features/usuario/entities/usuario.entity"
import { DecimalTransformer } from "src/shared/utils/decimal.transformer"
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
        type:"decimal",
        precision: 10,
        scale:2,
        default: 0.0,
        transformer: new DecimalTransformer()
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
        default: null
    }) 
    dataFinalizacao: Date

    @ManyToOne(() => Empresa, (empresa) => empresa.pedidos, {
        nullable:false
    })
    empresa:Empresa    

    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, {
        nullable:false
    })
    usuario:Usuario    

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    createdAt : string

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updatedAt : string

  
}
