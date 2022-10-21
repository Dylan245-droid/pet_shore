import {Field, InputType} from "@nestjs/graphql";
import {User} from "../../users/entities/user.entity";

@InputType()
export class LoginUserInput {
    @Field()
    username: string

    @Field()
    password: string
}