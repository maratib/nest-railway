import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Posts extends BaseEntity {
  @ApiProperty({ description: 'Unique ID of the Post' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ description: 'Post Title' })
  @Column({ type: 'varchar', length: 100 })
  public title: string;

  @ApiProperty({ description: 'Post Description' })
  @Column({ type: 'text' })
  public desc: string;

  @ApiProperty({ description: 'Post Title' })
  @Column({ type: 'varchar', length: 255 })
  public file: string;
}
