import { Controller, Get, UseGuards, Request, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Posts } from '@/db/entities/post.entity';
import { PaginationDto, PostDto } from '@/dtos';
import { SETTINGS } from '@/utils/app.utils';
import { PostService } from './post.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { diskStorage } from 'multer';
import { Uploader } from '@/helper';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async getAllPosts(): Promise<Posts[]> {
    return await this.postService.findAll();
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Get('all')
  // async getAllPosts(@Query() query: PaginationDto): Promise<Pagination<Posts>> {
  //   return await this.postService.getAllPosts(query);

  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: Posts,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again!',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Uploader.destinationPath,
        filename: Uploader.customFileName,
      }),
    }),
  )
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: PostDto,
    // @Body(SETTINGS.VALIDATION_PIPE)
    // postDto: PostDto,
  ): Promise<Posts> {
    const { path } = file;
    postDto.file = path.replace('public/', '');
    return await this.postService.doCreatePost(postDto);
  }
}
