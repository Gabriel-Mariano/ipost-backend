import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { PostModule } from './post/post.module';
import { AuthorizationMiddleware } from './post/middlewares/post.middleware';
import { PostController } from './post/post.controller';

@Module({
  imports: [UsersModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .exclude(
        { path:'posts', method: RequestMethod.GET },
      )
      .forRoutes(PostController)
  }
}
