import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'
@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    envFilePath: process.env.NODE_ENV ? './src/env/.env' : '',
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
