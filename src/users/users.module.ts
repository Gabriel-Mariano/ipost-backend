import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersPrismaRepository } from './repositories/user.prisma.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaClient, UsersPrismaRepository ]
})
export class UsersModule {}
