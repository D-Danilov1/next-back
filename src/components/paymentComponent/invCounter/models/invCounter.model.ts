import {
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';

interface UserCreationAttrs {
  id: string;
  inv_id: string;
}

@Table({ tableName: 'InvCounter' })
export class InvCounter extends EntityModel<InvCounter, UserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  inv_id: number;
}
