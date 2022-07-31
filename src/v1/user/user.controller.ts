import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@/db/entities/user.entity';
// import { UserRegisterRequestDto } from './dto/user-register.req.dto';

import { UserService } from './user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '@/dtos';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  @ApiResponse({
    description: 'List of Users object as response',
    type: [User],
  })
  async getAllUsers(@Query() query: PaginationDto): Promise<Pagination<User>> {
    return await this.userService.getAllUsers(query);
  }
}
