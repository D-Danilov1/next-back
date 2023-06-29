import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { EntityService } from '../../../classes/core/entity.service';
import { RoleToUserDto } from './dto/role-to-user.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { randomUUID } from 'crypto';
import { ROLES } from '../../../constants/roles.constants';
import * as bcrypt from 'bcryptjs';
import { Roles } from '../roles/models/roles.model';
import { LoggerService } from '../../loggerComponent/logger/logger.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService extends EntityService<Users> {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Users) protected repository: typeof Users,
    private rolesService: RolesService,
    protected loggerService: LoggerService,
  ) {
    super(repository, 'Users', loggerService);
    this.transporter = nodemailer.createTransport({
      host: 'webmail.mydomain.in',
      port: 465,
      auth: {
        user: 'noreply@nextworkoutapp.com',
        pass: 'gg-G!,f6FtQh',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'your_email@example.com',
      to,
      subject,
      text,
    });
  }

  // async generateAndSendPassword(dto) {
  //   // Генерируем случайный пароль
  //   const password = Math.random().toString(36).slice(-10); // Генерация 10-символьного случайного пароля

  //   // Отправляем пароль на почту
  //   const transporter = createTransport({
  //     host: 'webmail.mydomain.in',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       user: 'noreply@nextworkoutapp.com',
  //       pass: 'gg-G!,f6FtQh',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'noreply@nextworkoutapp.com',
  //     to: dto.email,
  //     subject: 'Your Password',
  //     text: `Your generated password is: ${password}`,
  //   };
  //   console.log(1);
  //   await transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  //   console.log(2);

  //   return password;
  // }

  async create(dto: CreateUsersDto): Promise<Users> {
    const candidate: Users = await this.repository.findOne({
      where: { email: dto.email },
    });
    // const passwordGen = await this.generateAndSendPassword(dto);
    if (candidate) {
      return candidate;
    }

    const password = '1234567890';

    const id: string = await randomUUID();
    const user: Users = await this.repository.create({
      id: id,
      ...dto,
      password,
    });

    const role: Roles = await this.rolesService.findByName(ROLES.USER);
    await user.$set('roles', [role.id]);

    return user;
  }

  private static async setPasswordToUser(password: string): Promise<string> {
    return await bcrypt.hash(password, 6);
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findOne({
      where: { email: email },
      include: { model: Roles },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async addRoleToUser(dto: RoleToUserDto) {
    const user: Users = await this.repository.findOne({
      where: { email: dto.userEmail },
    });
    const role: Roles = await this.rolesService.findByName(dto.roleName);
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    return await user.$add('roles', role.id);
  }

  async removeRoleToUser(dto: RoleToUserDto) {
    const user: Users = await this.repository.findOne({
      where: { email: dto.userEmail },
    });
    const role: Roles = await this.rolesService.findByName(dto.roleName);
    if (!user || !role) {
      throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }
    return await user.$remove('roles', role.id);
  }
}
