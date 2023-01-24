import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Headers, UseInterceptors } from '@nestjs/common/decorators';
import { FindPostDto } from './dto/find-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file:Express.Multer.File, @Body() createPostDto: CreatePostDto,@Headers('authorization') auth:string ) {
    const formatData = {...createPostDto, file:file.originalname };
    
    return this.postService.create(formatData, auth)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id:string) {
    return this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('title')
  findOne(@Body() body:FindPostDto) {
    return this.postService.findOne(body);
  }

  @Patch(':id')
  update(@Headers('Authorization') auth:string, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.postService.remove(id);
  }
}
