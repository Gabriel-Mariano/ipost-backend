import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        message:`Post com id ${createCommentDto.postId} não existe`
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

  async findAll() {
    const comments = await this.prismaComment.findAll();
    
    return comments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, authorId:string) {
    const post = await this.prismaPost.findById(updateCommentDto.postId);
    
    if(!post) {
      throw new HttpException({
        message:`Post com id ${updateCommentDto.postId} não existe`
      }, HttpStatus.UNAUTHORIZED);
    }

    const comment = await this.prismaComment.findOne(id);
    
    if(comment.postId !== updateCommentDto.postId ) {
      throw new HttpException({
        message:`Você não tem permissão para fazer essa ação`
      }, HttpStatus.UNAUTHORIZED)
    }

    if(!comment ) {
      throw new HttpException({
        message:`Nenhum comentário encontrado com este ${id}`
      }, HttpStatus.UNAUTHORIZED)
    }

    const user = await this.prismaUser.findById(authorId);

    if(!user) {
      throw new HttpException({
        message:'Você não tem autorização para realizar está ação'
      },HttpStatus.UNAUTHORIZED)
    }

    const updatedComment = await this.prismaComment.updateComment(id, updateCommentDto);

    return updatedComment;
  }

  async remove(id: string, authorId:string) {
    const comment = await this.prismaComment.findOne(id);

    if(!comment) {
      throw new HttpException({
        message:`Nenhum comentário encontrado com este ${id}`
      }, HttpStatus.UNAUTHORIZED)
    }

    const user = await this.prismaUser.findById(authorId);

    if(!user) {
      throw new HttpException({
        message:'Você não tem autorização para realizar está ação'
      },HttpStatus.UNAUTHORIZED)
    }

    const removedComment = await this.prismaComment.removeComment(id);

    return removedComment;
  }
}
