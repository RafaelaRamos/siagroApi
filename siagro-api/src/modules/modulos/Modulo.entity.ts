import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Propriedade } from '../propriedade/Propriedade.entity';

@Table
export class Modulo extends Model<Modulo> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nome: string;


    @ForeignKey(() => Propriedade)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    propriedadeId: number;

    @BelongsTo(() => Propriedade)
    propriedade: Propriedade;
}