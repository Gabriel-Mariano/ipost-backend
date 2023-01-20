import { CreatePostDto } from '../dto/create-post.dto'
import { Post } from '../entities/post.entity';

export abstract class PostsRepository {
    abstract execute(createPostDto:Post):Promise<any>;
}