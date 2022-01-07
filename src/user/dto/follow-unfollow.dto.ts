import { IsString } from 'class-validator';

export class FollowUnfollowDto {
  @IsString()
  currentId: string;

  @IsString()
  userId: string;
}
