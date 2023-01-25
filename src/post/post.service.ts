import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { validateAuthorization } from 'src/helpers/authorization.validation';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPostDto } from './dto/find-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsPrismaRepository } from './repositories/post.prisma.repository';

@Injectable()
export class PostService {
  constructor(
    private prismaUser:UsersPrismaRepository,
    private prismaPost:PostsPrismaRepository,
    private jwt:JwtService
  ){}
  async create(createPostDto: CreatePostDto, authorId:string) {
    const user = await  this.prismaUser.findById(authorId);

    if(!user){
      throw new HttpException({}, HttpStatus.UNAUTHORIZED);
    }

    const payload = {...createPostDto, authorId:authorId }

    const publication = new Post(payload);

    await this.prismaPost.execute(publication);

    return publication;
  }

  async findAll() {
    const posts = await this.prismaPost.findAll();

    return posts;
  }

  async findById(id:string) {
    const post = await this.prismaPost.findById(id);

    return post;
  }

  async findOne(findPostDto:FindPostDto) {
    const posts = await this.prismaPost.findByTitle(findPostDto.title);

    return posts;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const postFonded = await this.prismaPost.findById(id);
    
    if(!postFonded) {
      throw new HttpException({
        message:'Nenhum post encontrado'
      }, 
      HttpStatus.FORBIDDEN )}

    const postUpadated = await this.prismaPost.updatePost(id, updatePostDto);

    return postUpadated;
  }

  async remove(id: string) {

    const postFounded = await this.prismaPost.findById(id);

    if(!postFounded) {
      throw new HttpException({
        message:`Nenhum post encontrado com este id: ${id}`
      }, HttpStatus.UNAUTHORIZED);
    }

    const postRemoved = await this.prismaPost.removePost(id);

    return postRemoved;
  }
}
