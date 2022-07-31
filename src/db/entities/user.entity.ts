import * as bcrypt from 'bcrypt';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '@/types';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Unique ID of the User' })
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({ description: 'User Name' })
  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @ApiProperty({ description: 'User Role' })
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  public role: Role;

  @ApiProperty({ description: 'User email' })
  @Column({ type: 'varchar', unique: true, length: 100 })
  public email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column({ type: 'varchar', length: 100 })
  public password: string;

  @ApiProperty({ description: 'If user is active' })
  @Column({ type: 'boolean', default: false })
  public isActive: string;

  @ApiProperty({ description: 'If user is blocked' })
  @Column({ type: 'boolean', default: false })
  public isBlocked: string;

  @ApiProperty({ description: 'User created date' })
  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @ApiProperty({ description: 'User updated date' })
  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    console.log("In Before Insert");

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
