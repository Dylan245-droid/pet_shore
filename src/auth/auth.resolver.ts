import {Args, Context, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from "./auth.service";
import {LoginResponse} from "./dto/login-response";
import {LoginUserInput} from "./dto/login-user.input";
import {GqlAuthGuard} from "./gql-auth.guard";
import {UseGuards} from "@nestjs/common";
import {User} from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    // @UseGuards(AuthGuard('local')) // if it was an REST API
    @UseGuards(GqlAuthGuard)
    login(@Args('input') input: LoginUserInput, @Context() context) {
        return this.authService.login(context.user)
    }

    @Mutation(() => User)
    signup(@Args('input') input: LoginUserInput) {
        return this.authService.signup(input)
    }
}
