/* eslint-disable */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import {User} from "../users/entities/user.entity";

@Entity()
@ObjectType()
export class Pet extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @RelationId((self: Pet) => self.owner)
  @Column()
  readonly ownerId: User['id']

  @ManyToOne(() => User, (owner) => owner.pets)
  @JoinColumn()
  owner: User;
}
