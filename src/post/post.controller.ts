import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async post(@Body() dto: PostDto) {
    return this.postService.post(dto.authorId, dto.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Get('byUser/:id')
  async getPostsByUserId(@Param('id') id: string) {
    return this.postService.getPostsByUserId(id);
  }
}
