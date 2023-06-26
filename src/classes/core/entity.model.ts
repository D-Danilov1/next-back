import { ObjectType } from '@nestjs/graphql';
import { Model } from 'sequelize-typescript'

@ObjectType()
export class EntityModel<M, MCA = {}> extends Model<M, MCA> {
  user_id: string;
}
