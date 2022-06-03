import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseFactoryService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      charset: 'utf8mb4',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      logging: false,
      logger: 'simple-console',
      entities: [`${__dirname}/entities/**/*.entity.{ts,js}`],
      timezone: '+09:00',
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
