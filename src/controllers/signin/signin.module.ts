import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessRepository } from "src/repositories/access.repository";
import { SigninService } from "src/services/signin/signin.service";
import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { AccessTokenGenerator } from "../auth/autenticate/access-token-generator";
import { RecoverIdToken } from "../auth/autenticate/recover-id-token";
import { SigninController } from "./signin.controller";

@Module({
    imports: [
        // TypeOrmModule.forFeature([MembershipRepository])
    ],
    controllers: [
        SigninController
    ],
    providers: [
        SigninService,
        RecoverIdToken,
        AccessRepository,
        AccessTokenGenerator,
        EncriptorBcrypt,
        JwtService
    ]
})

export class SigninModule{}