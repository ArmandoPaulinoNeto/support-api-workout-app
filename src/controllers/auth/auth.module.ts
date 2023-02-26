import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipRepository } from 'src/repositories/membership.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { SignupService } from 'src/services/signup/signup.service';
import { SignupController } from '../signup/signup.controller';
import { AccessTokenGenerator } from './autenticate/access-token-generator';
import { RecoverUser } from './autenticate/recover-user-id';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
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
    TypeOrmModule.forFeature([MembershipRepository])
  ],
  controllers: [SignupController],
  providers: [
    JwtService,
    SignupService,
    UserRepository,
    MembershipRepository,
    AccessTokenGenerator,
    JwtStrategyService,
    RecoverUser
  ]
})
export class AuthModule {}
