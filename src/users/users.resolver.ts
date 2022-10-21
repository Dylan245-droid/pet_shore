import {Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGard} from "../auth/jwt-auth.gard";
import {Pet} from "../pets/pet.entity";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('username') username: string) {
    return this.usersService.findOne(username);
  }

  @ResolveField(returns => [Pet])
  pets(@Parent() owner: User): Promise<Pet[]> {
    return this.usersService.getPets(owner.id)
  }
}
