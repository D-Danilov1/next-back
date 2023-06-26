import { EntityModel } from './entity.model'
import { InjectModel } from '@nestjs/sequelize'
import { LoggerService } from '../../components/loggerComponent/logger/logger.service'

export abstract class EntityService<M> {

  protected constructor(
    @InjectModel(EntityModel) protected repository: typeof EntityModel<any>,
    protected model: string,
    protected loggerService: LoggerService
  ) {}

  async create(dto: any): Promise<M> {
    await this.loggerService?.create({
      user_id: dto.user_id,
      method_name: this.create.name,
      model_name: this.model,
      props: JSON.stringify(dto),
    })

    return (await this.repository.create(dto)) as M
  }

  async findAll(): Promise<M[]> {
    return (await this.repository.findAll()) as M[]
  }

  async findByPk(id: any): Promise<M> {
    return (await this.repository.findByPk(id)) as M
  }

  async update(dto: any): Promise<number[]> {
    await this.loggerService?.create({
      user_id: dto.user_id,
      method_name: this.update.name,
      model_name: this.model,
      props: JSON.stringify(dto),
    })

    return this.repository.update(dto, { where: { id: dto.id } })
  }

  async destroy(id: any) {
    const result = await this.repository.findOne({ where: { id } })

    await this.loggerService?.create({
      user_id: result.user_id,
      method_name: this.destroy.name,
      model_name: this.model,
      props: JSON.stringify(id),
    })

    return await this.repository.destroy({ where: { id: id } })
  }
}
