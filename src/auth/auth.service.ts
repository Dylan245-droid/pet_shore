import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {LoginUserInput} from "./dto/login-user.input";
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        const valid = bcrypt.compare(password, user?.password)

        if (user && valid){
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.id,
            }),
            user,
        }
    }

    async signup(input: LoginUserInput) {

        //if (await this.usersService.findOne(input.username)) {
        //    throw new Error('User already exists.')
        // }

        const password = await bcrypt.hash(input.password, 10)

        return this.usersService.userCreate({
            ...input,
            password,
        })
    }
}
