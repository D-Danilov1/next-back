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
      service: 'gmail',
      port: 465,
      secure: false,
      secureConnection: false,
      auth: {
        user: 'noreply.nextapp@gmail.com',
        pass: 'lktppafdbqvditfk',
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'noreply.nextapp@gmail.com',
      to,
      subject,
      text,
    });
  }

  async generateAndSendPassword(dto) {
    const password = Math.random().toString(36).slice(-10);

    await this.sendMail(
      dto.email,
      'Your password',
      `Your password is: ${password}`,
    );

    return password;
  }

  async create(dto: CreateUsersDto): Promise<Users> {
    if (!dto.email) throw new HttpException('Email not found', HttpStatus.NOT_FOUND);;

    const candidate: Users = await this.repository.findOne({
      where: { email: dto?.email },
    });

    if (candidate) {
      return candidate;
    }

    const passwordGen = await this.generateAndSendPassword(dto);

    const id: string = await randomUUID();

    const password = await UsersService.setPasswordToUser(passwordGen);

    const user: Users = await this.repository.create({
      id: id,
      ...dto,
      password: password,
    });

    const role: Roles = await this.rolesService.findByName(ROLES.USER);
    await user.$set('roles', [role?.id]);

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
