import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { Users } from '../../users/models/users.model'
import { EntityModel } from '../../../../classes/core/entity.model'

interface RefreshTokenCreationAttrs {
  user_id: string
  token: string
}

@Table({ tableName: 'RefreshTokens' })
export class RefreshTokens extends EntityModel<RefreshTokens, RefreshTokenCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true })
  token: string

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING })
  user_id: string

  @BelongsTo(() => Users)
  user: Users
}
