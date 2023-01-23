import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { PostsPrismaRepository } from './repositories/post.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationMiddleware } from './middlewares/post.middleware';

@Module({
  controllers: [PostController],
  providers: [PostService, PostsPrismaRepository, UsersPrismaRepository, PrismaClient, JwtService, AuthorizationMiddleware]
})
export class PostModule {}
