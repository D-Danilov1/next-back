import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Users } from '../../../usersComponent/users/models/users.model';
import { SubscriptionPeriods } from '../../subscription-periods/models/subscription-periods.model';

interface SubscriptionsCreationAttrs {
  user_id: string;
  subscription_period_id: number;
  payment_amount: string;
  start_of: string;
  end_of: string;
  subscription_id?: string;
}

@Table({ tableName: 'Subscriptions' })
export class Subscriptions extends EntityModel<
  Subscriptions,
  SubscriptionsCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING, allowNull: false })
  user_id: string;

  @ForeignKey(() => SubscriptionPeriods)
  @Column({ type: DataType.INTEGER, allowNull: false })
  subscription_period_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  payment_amount: string;

  @Column({ type: DataType.DATE, allowNull: false })
  start_of: string;

  @Column({ type: DataType.DATE, allowNull: false })
  end_of: string;
  
  @Column({ type: DataType.STRING, allowNull: true }) // Добавлен столбец для subscription_id
  subscription_id: string;
}
