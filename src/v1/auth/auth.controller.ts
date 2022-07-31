import { UserService } from '@/v1/user/user.service';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SETTINGS } from '@/utils/app.utils';
import { LoginDto, UserDto } from '@/dtos';
import { User } from '@/db/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async user(@Request() req): Promise<any> {
    return req.user;
  }

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again!',
  })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserDto,
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<any> {
    return this.authService.generateToken(req.user);
  }
}
