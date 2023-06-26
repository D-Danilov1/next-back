import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUsersDto } from './dto/create-users.dto'
import { Users } from './models/users.model'
import { RoleToUserDto } from './dto/role-to-user.dto'
import { UpdateUsersDto } from './dto/update-users.dto'
import { ValidationPipe } from '../../../pipes/validation.pipe'
import { ROLES } from '../../../constants/roles.constants'
import { RolesGuards } from '../../../decorators/roles-guards.decorator'
import { EntityController } from '../../../classes/core/entity.controller'

@Controller('/users')
export class UsersController extends EntityController<Users, CreateUsersDto, UpdateUsersDto> {
  constructor(protected service: UsersService) {
    super(service)
  }

  @RolesGuards([ROLES.ADMIN])
  @Get('/email/:email')
  async findByEmail(
    @Param('email') email: string,
  ): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.findByEmail(email),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Put('/add/role')
  async addRoleToUser(
    @Body() dto: RoleToUserDto,
  ): Promise<{ response: unknown; statusCode: HttpStatus }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.addRoleToUser(dto),
    }
  }

  @UsePipes(ValidationPipe)
  @RolesGuards([ROLES.ADMIN])
  @Delete('/remove/role')
  async removeRoleToUser(
    @Body() dto: RoleToUserDto,
  ): Promise<{ response: number; statusCode: number }> {
    return {
      statusCode: HttpStatus.OK,
      response: await this.service.removeRoleToUser(dto),
    }
  }
}
