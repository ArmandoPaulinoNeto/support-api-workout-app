import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessRepository } from "src/repositories/access.repository";
import { PupilRepository } from "src/repositories/pupil.repository";
import { SignupService } from "src/services/signup/signup.service";
import { EncriptorBcrypt } from "src/util/encriptor-bcrypt";
import { AccessTokenGenerator } from "../auth/autenticate/access-token-generator";
import { RecoverIdToken } from "../auth/autenticate/recover-id-token";
import { SignupController } from "./signup.controller";
import { TrainingRepository } from "src/repositories/training.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";

@Module({
    imports: [      
    ],
    controllers: [
        SignupController
    ],
    providers: [
        SignupService,
        PupilRepository,
        TrainingRepository,
        ScheduleRepository,
        RecoverIdToken,
        AccessRepository,
        AccessTokenGenerator,
        EncriptorBcrypt,
        JwtService
    ]
})

export class SignupModule{}