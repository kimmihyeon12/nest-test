import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as morgan from 'morgan';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  INestApplication,
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //security and loggingg
  app.use(morgan('tiny'));
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableVersioning();

  setupSwagger(app);
  // validation pipe (class-validation, class-transformer)
  // const validationPipeOptions: ValidationPipeOptions = {
  //   transform: true,
  //   exceptionFactory: (errors: ValidationError[]) => {
  //     if (errors && errors.length > 0) {
  //       const error = errors[0].constraints;
  //       const keys = Object.keys(error);
  //       const type = keys[keys.length - 1];
  //       const message = error[type];
  //       return new BadRequestException(message);
  //     }
  //   },
  // };
  const validationPipe = new ValidationPipe();
  app.useGlobalPipes(validationPipe);

  await app.listen(3000, () => {
    Logger.log('server');
  });
}

//swagger
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NestJS Study API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
