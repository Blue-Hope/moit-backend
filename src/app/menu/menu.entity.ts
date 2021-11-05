import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Restaurant } from '@app/restaurant/restaurant.entity';

@Entity()
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;

  @ApiProperty()
  @IsString()
  @Column()
  title: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  price: number;

  @ApiProperty()
  @IsString()
  @Column()
  imageKey: string;
}