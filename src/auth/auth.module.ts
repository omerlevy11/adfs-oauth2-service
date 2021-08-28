import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BioPassStrategy } from './biopass.strategy';
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, BioPassStrategy],
})
export class AuthModule { }
