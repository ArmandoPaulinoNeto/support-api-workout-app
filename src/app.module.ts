import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SignupModule } from './controllers/signup/signup.module';
import { AuthModule } from './controllers/auth/auth.module';
import { SigninModule } from './controllers/signin/signin.module';
import { AdministratorController } from './controllers/administrator/administrator.controller';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorRepository } from './repositories/administrator.repository';
import { AdministratorModule } from './controllers/administrator/administrator.module';
import { RecoverIdToken } from './controllers/auth/autenticate/recover-id-token';
import { JwtService } from '@nestjs/jwt';
import { PupilRepository } from './repositories/pupil.repository';
import { SigninController } from './controllers/signin/signin.controller';
import { SigninService } from './services/signin/signin.service';
import { AccessRepository } from './repositories/access.repository';
import { AccessTokenGenerator } from './controllers/auth/autenticate/access-token-generator';
import { EncriptorBcrypt } from './util/encriptor-bcrypt';
import { LoadingDataController } from './controllers/loading-data/loading-data.controller';
import { LoadingDataRepository } from './repositories/loading-data.repository';
import { PupilController } from './controllers/pupil/pupil.controller';
import { PupilService } from './services/pupil/pupil.service';
import { TrainingRepository } from './repositories/training.repository';
import { SignupService } from './services/signup/signup.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        AuthModule,
        SignupModule,
        SigninModule,
        AdministratorModule
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [],
        migrations: ['/../migrations/*{.ts,.js}'],
        synchronize: true,
        migrationsRun: true
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      }
    })

  ],
  providers: [
    AdministratorService,
    AdministratorRepository,
    PupilService,
    PupilRepository,
    TrainingRepository,
    AccessRepository,
    LoadingDataRepository,
    AccessTokenGenerator,
    EncriptorBcrypt,
    SigninService,
    SignupService,
    RecoverIdToken,
    JwtService
  ],
  controllers: [AdministratorController, PupilController,SigninController, SigninController, LoadingDataController],
})
export class AppModule {}
