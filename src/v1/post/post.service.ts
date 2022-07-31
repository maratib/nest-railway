import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '@/db/entities/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from '@/dtos';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Posts) private readonly postRepo: Repository<Posts>) {}

  private async doPagination(options: IPaginationOptions): Promise<Pagination<Posts>> {
    const qb = this.postRepo.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<Posts>(qb, options);
  }

  /**
   * Find all return pagination results
   * @param options
   * @returns
   */
  async getAllPosts(options: IPaginationOptions): Promise<Pagination<Posts>> {
    return await this.doPagination(options);
  }

  async findAll(): Promise<Posts[]> {
    return this.postRepo.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async doCreatePost(postDto: PostDto): Promise<Posts> {
    return await this.postRepo.save(this.postRepo.create(postDto));
  }
}
