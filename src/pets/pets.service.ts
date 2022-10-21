import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/pet-create.dto';
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private PetsRepository: Repository<Pet>,
    private readonly usersService: UsersService,
  ) {}

  async createPet(createPetInput: CreatePetInput, user: any): Promise<Pet> {
    const newPet = this.PetsRepository.create(createPetInput); //newPet = new Pet() and newPet.name = createPetInput.name ...
    newPet.owner = new User();
    newPet.owner.id = user.userId
    await newPet.save()
    return this.PetsRepository.save(newPet); // insert into database
  }

  async findAll(): Promise<Pet[]> {
    // const pet = new Pet()
    // pet.id = 1
    // pet.name = "Rocky"
    // pet.type = "Dog"
    // return [pet]
    return this.PetsRepository.find(); // SELECT * FROM pet
  }

  findOne(id: Pet['id']): Promise<Pet> {
    return this.PetsRepository.findOneOrFail({ where: { id } });
  }

  getOwner(id: User['id']): Promise<User> {
    return this.usersService.findOneById(id);
  }
}
