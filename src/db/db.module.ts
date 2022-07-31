import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { typeOrmAsyncConfig } from '../config/typeorm.config';
import { Posts } from './entities/post.entity';

const Repositories = TypeOrmModule.forFeature([User, Posts]);

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmAsyncConfig), Repositories],
  exports: [TypeOrmModule],
})
export class DbModule {}
