import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { User } from '@/db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@/dtos';
import { Role } from '@/types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async doUserRegistration(userRegister: UserDto): Promise<User> {
    return await this.userRepo.save(this.userRepo.create(userRegister));
    // return await this.userRepo.save(userRegister);
  }

  private async doPagination(options: IPaginationOptions): Promise<Pagination<User>> {
    const qb = this.userRepo.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<User>(qb, options);
  }

  // async getAllUsers(options: IPaginationOptions): Promise<User[]> {
  async getAllUsers(options: IPaginationOptions): Promise<Pagination<User>> {
    return await this.doPagination(options);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }
  getRoleById(id: number): string {
    return Role.USER;
  }
}
