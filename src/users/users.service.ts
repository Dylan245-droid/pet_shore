import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {User} from "./entities/user.entity";
import {Pet} from "../pets/pet.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private UsersRepository: Repository<User>,
      @InjectRepository(Pet) private readonly PetsRepository: Repository<Pet>
  ) {}

  async userCreate(input: CreateUserInput): Promise<User> {
    const user = this.UsersRepository.create(input);
    return this.UsersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  findOne(username: User['username']): Promise<User> {
    return this.UsersRepository.findOneOrFail({where: {username}})
  }

  findOneById(id: User['id']): Promise<User> {
    return this.UsersRepository.findOneOrFail({where: {id}})
  }

  getPets(ownerId: number): Promise<Pet[]> {
    return this.PetsRepository.find({where: {ownerId: ownerId}})
  }
}
