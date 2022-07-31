import { UserService } from '@/v1/user/user.service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '@/types';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {}
  async use(req: Request | any, res: Response, next: () => void) {
    this.logger.debug('Going through middleware');

    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader?.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      return next();
    }

    let user;

    // try {
    //   const { userId: id }: AccessTokenPayload = verify(
    //     accessToken,
    //     process.env.ACCESS_TOKEN_SECRET,
    //   );
    //   user = await this.userService.findOneById(id);
    // } catch (error) {
    //   throw new ForbiddenException('Please register or sign in.');
    // }

    this.logger.debug('I am from AuthMiddleware', accessToken);

    next();
  }
}
