import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Pet} from "../pets/pet.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
