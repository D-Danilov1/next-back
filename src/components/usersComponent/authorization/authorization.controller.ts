import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { CreateUsersDto } from '../users/dto/create-users.dto';
import { AuthorizationService } from './authorization.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { ValidationPipe } from '../../../pipes/validation.pipe';
import { Cookies } from '../../../classes/authorization/jwt/cookies';
import { passthrough } from '../../../typing/response-setting.types';
import {
  AuthorizationResponse,
  RefreshResponse,
} from '../../../typing/authorization.types';
import { Users } from '../users/models/users.model';
import { Request, Response } from 'express';
import { ApiCookieAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('')
export class AuthorizationController {
  constructor(private service: AuthorizationService) {}

  @ApiCreatedResponse({ description: 'Login successfully' })
  @UsePipes(ValidationPipe)
  @Post('/login')
  async login(
    @Body() dto: AuthorizationDto,
    @Res(passthrough) response: Response,
  ): Promise<{
    response: AuthorizationResponse;
    statusCode: HttpStatus.CREATED;
  }> {
    const data = await this.service.login(dto);

    Cookies.setRefreshToken(response, data.refreshToken);

    return {
      statusCode: HttpStatus.CREATED,
      response: data,
    };
  }

  @ApiCreatedResponse({ description: 'Registration successfully' })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  async registration(
    @Body() dto: CreateUsersDto,
  ): Promise<{ response: Users; statusCode: number }> {
    return {
      statusCode: HttpStatus.CREATED,
      response: await this.service.registration(dto),
    };
  }

  @ApiCookieAuth()
  @ApiCreatedResponse({ description: 'Logout successfully' })
  @UsePipes(ValidationPipe)
  @Delete('/logout')
  async logout(
    @Req() request: Request,
    @Res(passthrough) response: Response,
  ): Promise<{ response: number; statusCode: HttpStatus.OK }> {
    const { refreshToken } = request.cookies;

    response.clearCookie('refreshToken');

    return {
      statusCode: HttpStatus.OK,
      response: await this.service.logout(refreshToken),
    };
  }

  @ApiCookieAuth()
  @UsePipes(ValidationPipe)
  @Put('/refresh')
  async refresh(
    @Req() request: Request,
  ): Promise<{ response: RefreshResponse; statusCode: HttpStatus.OK }> {
    const { refreshToken } = request.cookies;
    const data = await this.service.refresh(refreshToken);

    return {
      statusCode: HttpStatus.OK,
      response: data,
    };
  }
}
