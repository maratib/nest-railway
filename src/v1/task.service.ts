import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { UserService } from './user/user.service';

@Injectable()
export class TaskService {
  constructor(private userService: UserService) { }
  private readonly logger = new Logger(TaskService.name);
  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.warn('Called every second is 45');
  // }
  //   @Interval(10000)
  //   async handleInterval() {
  //     this.logger.warn('Called every 10 seconds');
  //     const user = await this.userService.getUserById(1);
  //     console.log(user?.name);
  //   }

  //   @Timeout(5000)
  //   handleTimeout() {
  //     this.logger.warn('Called once after 5 seconds');
  //   }
}
