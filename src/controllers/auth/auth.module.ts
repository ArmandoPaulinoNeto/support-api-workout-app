import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessRepository } from 'src/repositories/access.repository';
import { PupilRepository } from 'src/repositories/pupil.repository';
import { SignupService } from 'src/services/signup/signup.service';
import { EncriptorBcrypt } from 'src/util/encriptor-bcrypt';
import { SignupController } from '../signup/signup.controller';
import { AccessTokenGenerator } from './autenticate/access-token-generator';
import { RecoverIdToken } from './autenticate/recover-id-token';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { TrainingRepository } from 'src/repositories/training.repository';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
require('dotenv/config');

@Module({
  imports: [
    JwtModule.register(
      {
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: '60s',
        },
      },
      
    ),
  ],
  controllers: [SignupController],
  providers: [
    JwtService,
    SignupService,
    PupilRepository,
    TrainingRepository,
    ScheduleRepository,
    AccessTokenGenerator,
    AccessRepository,
    EncriptorBcrypt,
    JwtStrategyService,
    RecoverIdToken
  ]
})
export class AuthModule {}
