import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreatePetInput } from './dto/pet-create.dto';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import {User} from "../users/entities/user.entity";
import {CurrentUser, JwtAuthGard} from "../auth/jwt-auth.gard";
import {UseGuards} from "@nestjs/common";

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private readonly petService: PetsService) {}

  @UseGuards(JwtAuthGard)
  @Mutation(returns => Pet)
  createPet(@Args('input') createPetInput: CreatePetInput, @CurrentUser() user: any): Promise<Pet> {
    return this.petService.createPet(createPetInput, user);
  }

  @UseGuards(JwtAuthGard)
  @Query((returns) => [Pet])
  getPets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Query(returns => Pet)
  pet(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
    return this.petService.findOne(id)
  }

  @ResolveField(returns => User)
  owner(@Parent() pet: Pet): Promise<User> {
    return this.petService.getOwner(pet.ownerId)
  }
}
