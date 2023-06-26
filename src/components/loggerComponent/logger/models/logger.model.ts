import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { EntityModel } from '../../../../classes/core/entity.model'
import { Users } from '../../../usersComponent/users/models/users.model'

interface LoggerCreationAttrs {
  user_id: string
  method_name: string
  model_name: string
}

@Table({ tableName: 'Logger' })
export class Logger extends EntityModel<Logger, LoggerCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING, allowNull: true })
  user_id: string

  @Column({ type: DataType.STRING, allowNull: false })
  method_name: string

  @Column({ type: DataType.STRING, allowNull: false })
  model_name: string

  @Column({ type: DataType.STRING, allowNull: false })
  props: string
}
