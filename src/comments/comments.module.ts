import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { PostsPrismaRepository } from 'src/post/repositories/post.prisma.repository';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { CommentsPrismaRepository } from './repositories/comment.prisma.repository';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { AuthorizationMiddleware } from 'src/post/middlewares/post.middleware';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService, 
    CommentsPrismaRepository, 
    PostService, 
    PostsPrismaRepository, 
    UsersPrismaRepository, 
    UsersService, 
    PrismaClient,
    JwtService, 
    AuthorizationMiddleware 
  ]
})
export class CommentsModule {}
