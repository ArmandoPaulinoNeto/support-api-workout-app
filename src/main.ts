import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  AppDataSource.initialize();

  var port = process.env.API_ENVIRONMENT == "local"
              ? process.env.API_PORT_LOCAL 
              : process.env.API_PORT_CONTAINER;
  
  await app.listen(port);
}
bootstrap();
