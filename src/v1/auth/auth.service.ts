import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtTokenService: JwtService) { }
  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BadRequestException('User does not exists');

    if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException();

    return user;
  }


  /**
   * Description placeholder
   * @date 13/07/2022 - 4:22:52 pm
   *
   * @param {*} user
   * @returns {{ accessToken: any; }}
   */
  generateToken(user: any) {
    const payload = { username: user.email, sub: user.id };
    return { accessToken: this.jwtTokenService.sign(payload) };
  }
}
