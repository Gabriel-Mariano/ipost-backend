import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Headers('authorid') authorId:string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto, authorId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Headers('authorid') authorId:string,
    @Param('id') id: string, 
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.update(id, updateCommentDto, authorId);
  }

  @Delete(':id')
  remove(@Headers('authorid') authorId:string, @Param('id') id: string) {
    return this.commentsService.remove(id, authorId);
  }
}
