import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export abstract class PostsRepository {
    abstract execute(createPostDto:Post):Promise<Post>;
    abstract findAll():Promise<Post[]>;
    abstract findById(id:string):Promise<Post>;
    abstract findByTitle(title:string):Promise<Post[]>;
    abstract updatePost(id:string,updatePostDto:UpdatePostDto):Promise<Post>;
}