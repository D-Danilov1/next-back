import { HttpException, HttpStatus } from '@nestjs/common'
import { Users } from '../components/usersComponent/users/models/users.model'

export async function findByName(name: string) {
  return await this.repository.findOne({
    where: { name: name },
  })
}
export async function findByEmail(email: string) {
  const user: Users = await this.usersService.findByEmail(email)

  if (!user) {
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
  }

  return await this.repository.findAll({
    where: { user_id: user.id },
  })
}
