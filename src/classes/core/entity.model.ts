import { Model } from 'sequelize-typescript';

export class EntityModel<M, MCA = {}> extends Model<M, MCA> {
  user_id: string;
}
