import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pet} from "../../pets/pet.entity";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  username: string

  @Field(() => String)
  @Column()
  password: string

  @ManyToOne(() => Pet, pet => pet.owner)
  pets: Pet[]
}
