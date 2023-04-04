import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdministratorRepository } from "src/repositories/administrator.repository";
import { PupilRepository } from "src/repositories/pupil.repository";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { RecoverIdToken } from "../auth/autenticate/recover-id-token";
import { AdministratorController } from "./administrator.controller";

@Module({
    imports: [
        // TypeOrmModule.forFeature([AdministratorRepository])
    ],
    controllers: [
        AdministratorController
    ],
    providers: [
        AdministratorService,
        AdministratorRepository,
        PupilRepository,
        RecoverIdToken,
        JwtService
    ]
})

export class AdministratorModule{}