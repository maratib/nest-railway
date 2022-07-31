import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, Length, Matches } from 'class-validator';
import { toNumber } from '@/utils/cast.helper';

import { MESSAGES, REGEX } from '@/utils/app.utils';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'reachme@amitavroy.com',
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsNotEmpty()
  password: string;
}

export class PaginationDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  public page: number = 1;

  @Transform(({ value }) => toNumber(value, { default: 2, min: 1 }))
  @IsNumber()
  @IsOptional()
  public limit: number = 2;
}

export class UserDto {
  @ApiProperty({
    description: 'The name of the User',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty({ message: 'No empty email allowed' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Confirm the password',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirm: string;
}

export class PostDto {
  @ApiProperty({
    description: 'Title of the Post',
    example: 'My Funny post',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the Post',
    example: 'Lorem ipsum',
  })
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    description: 'Post Avatar',
    example: 'image.jpg',
  })
  file: string;
}
