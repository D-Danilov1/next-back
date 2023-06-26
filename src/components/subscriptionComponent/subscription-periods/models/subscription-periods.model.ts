import { Column, DataType, HasMany, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { Subscriptions } from '../../subscriptions/models/subscriptions.model'

interface SubscriptionPeriodCreationAttrs {
  name: string
  user_id: string
}

@Table({ tableName: 'SubscriptionPeriods' })
export class SubscriptionPeriods extends EntityModel<SubscriptionPeriods, SubscriptionPeriodCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string

  @Column({ type: DataType.INTEGER, allowNull: false })
  period: number

  @HasMany(() => Subscriptions)
  subscriptions: Subscriptions[]
}
