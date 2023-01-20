import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UsersPrismaRepository } from 'src/users/repositories/user.prisma.repository';
import { CreatePostDto } from './dto/create-post.dto';
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
  async create(createPostDto: CreatePostDto, auth:string) {
    const { authorId } = createPostDto;

    const user = await  this.prismaUser.findById(authorId);

    if(!user){
      throw new HttpException({}, HttpStatus.UNAUTHORIZED);
    }

    const [,token] = auth.split(" ");
 
    const decode = this.jwt.decode(token);

    if(authorId !== decode.sub) {
      throw new HttpException({
        message:'Usuário não autorizado 😑 .' 
      }, HttpStatus.UNAUTHORIZED);
    }

    const publication = new Post(createPostDto);

    await this.prismaPost.execute(publication);

    return publication;
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
