import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript'
import { Roles } from '../../roles/models/roles.model'
import { UsersRoles } from '../../users-roles/users-roles.model'
import { EntityModel } from '../../../../classes/core/entity.model'
import { Subscriptions } from '../../../subscriptionComponent/subscriptions/models/subscriptions.model'

interface UserCreationAttrs {
  id: string
  email: string
  password: string
}

@Table({ tableName: 'Users' })
export class Users extends EntityModel<Users, UserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Column({ type: DataType.DATE, allowNull: true })
  banned_at: string

  @Column({ type: DataType.DATE, allowNull: true })
  banned_by: string

  @BelongsToMany(() => Roles, () => UsersRoles)
  roles: Roles[]

  @HasMany(() => Subscriptions)
  subscriptions: Subscriptions[]
}
