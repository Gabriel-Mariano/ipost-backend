import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostsPrismaRepository } from 'src/post/repositories/post.prisma.repository';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentsPrismaRepository } from './repositories/comment.prisma.repository';

@Injectable()
export class CommentsService {
  constructor(
    private prismaPost:PostsPrismaRepository,
    private prismaUser:UsersPrismaRepository,
    private prismaComment:CommentsPrismaRepository
    ){}

  async create(createCommentDto: CreateCommentDto, authorId:string) {
    const post = await this.prismaPost.findById(createCommentDto.postId);

    if(!post) {
      throw new HttpException({
        message:`Post com id ${post.id} não existe`
      }, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prismaUser.findById(authorId);

    if(!user) {
      throw new HttpException({
        message:'Você não tem autorização para realizar está ação'
      },HttpStatus.UNAUTHORIZED)
    }

    const payload = {...createCommentDto, authorId:authorId };

    const comment = new Comment(payload);
   
    await this.prismaComment.execute(comment);

    return comment;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
