import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateLoggerDto } from './dto/create-logger.dto'
import { Logger } from './models/logger.model'

@Injectable()
export class LoggerService {
  constructor(@InjectModel(Logger) protected repository: typeof Logger) {}

  async create(dto: CreateLoggerDto) {
    return await this.repository.create(dto)
  }
}
