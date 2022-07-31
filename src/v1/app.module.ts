import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, validationSchema } from '@/config/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { AuthMiddleware } from './auth/middleware/AuthMiddleware';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [config],
    }),
    UserModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  controllers: [],
  providers: [AppService, TaskService],
})
export class AppModule {
  /**
   * Adding middleware
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
