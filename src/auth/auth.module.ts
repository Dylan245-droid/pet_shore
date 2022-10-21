import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JWTStrategy} from "./jwt.strategy";

@Module({
  imports: [PassportModule, UsersModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (ConfigService) => ({
      secret: ConfigService.get('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JWTStrategy],
  exports: [AuthService]
})
export class AuthModule {}
