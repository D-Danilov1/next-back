import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Users } from './models/users.model'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from '../roles/roles.service'
import { EntityService } from '../../../classes/core/entity.service'
import { RoleToUserDto } from './dto/role-to-user.dto'
import { CreateUsersDto } from './dto/create-users.dto'
import { randomUUID } from 'crypto'
import { ROLES } from '../../../constants/roles.constants'
import * as bcrypt from 'bcryptjs'
import { Roles } from '../roles/models/roles.model'
import { LoggerService } from '../../loggerComponent/logger/logger.service';

@Injectable()
export class UsersService extends EntityService<Users> {
  constructor(
    @InjectModel(Users) protected repository: typeof Users,
    private rolesService: RolesService,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'Users', loggerService)
  }

  async create(dto: CreateUsersDto): Promise<Users> {
    const candidate: Users = await this.repository.findOne({
      where: { email: dto.email },
    })
    if (candidate) {
      throw new HttpException('Пользователь с таким Email уже существует', HttpStatus.BAD_REQUEST)
    }

    dto.password = await UsersService.setPasswordToUser(dto.password)

    const id: string = randomUUID()
    const user: Users = await this.repository.create({ id: id, ...dto })

    const role: Roles = await this.rolesService.findByName(ROLES.USER)
    await user.$set('roles', [role.id])

    return user
  }

  private static async setPasswordToUser(password: string): Promise<string> {
    return await bcrypt.hash(password, 6)
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({
      where: { email: email },
      include: { model: Roles },
    })

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async addRoleToUser(dto: RoleToUserDto) {
    const user: Users = await this.repository.findOne({
      where: { email: dto.userEmail },
    })
    const role: Roles = await this.rolesService.findByName(dto.roleName)
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }
    return await user.$add('roles', role.id)
  }

  async removeRoleToUser(dto: RoleToUserDto) {
    const user: Users = await this.repository.findOne({
      where: { email: dto.userEmail },
    })
    const role: Roles = await this.rolesService.findByName(dto.roleName)
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }
    return await user.$remove('roles', role.id)
  }
}
