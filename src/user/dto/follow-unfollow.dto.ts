import { IsString } from 'class-validator';

export class FollowUnfollowDto {
  @IsString()
  currentId: string;
}
