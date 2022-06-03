import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [BoardsModule, ConfigModule.forRoot()],
})
export class AppModule {}
