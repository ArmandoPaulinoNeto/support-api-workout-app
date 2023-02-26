import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MembershipRepository } from "src/repositories/membership.repository";
import { UserRepository } from "src/repositories/user.repository";
import { SignupService } from "src/services/signup/signup.service";
import { AccessTokenGenerator } from "../auth/autenticate/access-token-generator";
import { RecoverUser } from "../auth/autenticate/recover-user-id";
import { SignupController } from "./signup.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([MembershipRepository])
    ],
    controllers: [
        SignupController
    ],
    providers: [
        SignupService,
        RecoverUser,
        MembershipRepository,
        UserRepository,
        AccessTokenGenerator,
        JwtService
    ]
})

export class SignupModule{}