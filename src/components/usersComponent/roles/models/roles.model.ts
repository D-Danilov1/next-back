import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript'
import { Users } from '../../users/models/users.model'
import { UsersRoles } from '../../users-roles/users-roles.model'
import { EntityModel } from '../../../../classes/core/entity.model'

interface RoleCreationAttrs {
  name: string
}

@Table({ tableName: 'Roles' })
export class Roles extends EntityModel<Roles, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string

  @BelongsToMany(() => Users, () => UsersRoles)
  users: Users[]
}
