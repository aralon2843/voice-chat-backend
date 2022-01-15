import { IsString } from 'class-validator';

export class PostDto {
  @IsString()
  authorId: string;

  @IsString()
  body: string;
}
