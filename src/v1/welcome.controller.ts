import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Welcome')
@Controller()
export class WelcomeController {
  private readonly logger = new Logger(this.constructor.name);
  constructor() {}

  @Get()
  index(): string {
    return 'Hello World';
  }
}
