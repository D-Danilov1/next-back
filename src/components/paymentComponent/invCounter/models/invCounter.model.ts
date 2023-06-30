import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Subscriptions } from '../../../subscriptionComponent/subscriptions/models/subscriptions.model';
import { ObjectType } from '@nestjs/graphql';

interface UserCreationAttrs {
  id: string;
  inv_id: string;
}

@ObjectType()
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
