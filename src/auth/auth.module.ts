import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    ConfigModule.forRoot(),
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{ expiresIn:'3333360s' },
    })
  ],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersPrismaRepository,PrismaClient],
  exports:[AuthService]
})
export class AuthModule {}
