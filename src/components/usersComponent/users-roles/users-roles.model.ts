import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { Roles } from '../roles/models/roles.model'
import { Users } from '../users/models/users.model'
import { EntityModel } from '../../../classes/core/entity.model'

interface UsersRolesCreationAttrs {
  user_id: string
  role_id: number
}

@Table({ tableName: 'UsersRoles' })
export class UsersRoles extends EntityModel<UsersRoles, UsersRolesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING })
  user_id: string

  @ForeignKey(() => Roles)
  @Column({ type: DataType.INTEGER })
  role_id: number
}
