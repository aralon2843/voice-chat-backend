import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from './post.model';
import { DocumentType } from '@typegoose/typegoose';
import {
  POST_NOT_FOUND_ERROR,
  USER_POSTS_NOT_FOUND_ERROR,
} from './post.constants';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: ModelType<PostModel>,
  ) {}

  async post(authorId: string, body: string): Promise<DocumentType<PostModel>> {
    const newPost = new this.postModel({
      authorId,
      body,
    });
    return newPost.save();
  }

  async delete(id: string): Promise<DocumentType<PostModel | null>> {
    const deletedPost = await this.postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return deletedPost;
  }

  async getPost(id: string) {
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }

    return post;
  }

  async getPostsByUserId(id: string): Promise<DocumentType<PostModel>[]> {
    const posts = await this.postModel.find({ authorId: id });

    if (!posts) {
      throw new NotFoundException(USER_POSTS_NOT_FOUND_ERROR);
    }

    return posts;
  }
}
