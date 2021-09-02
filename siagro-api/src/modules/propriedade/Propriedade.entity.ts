import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Propriedade extends Model<Propriedade> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nome: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    proprietario: string;
    
    @Column({
      type: DataType.TEXT,
      allowNull: false,
  })
  contato: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
})

telefone: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}