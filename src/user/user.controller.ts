import { UserService } from './user.service';
import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FollowUnfollowDto } from './dto/follow-unfollow.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/follow')
  async follow(@Body() dto: FollowUnfollowDto, @Param('id') userId: string) {
    return this.userService.follow(dto.currentId, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/unfollow')
  async unfollow(@Body() dto: FollowUnfollowDto, @Param('id') userId: string) {
    return this.userService.unfollow(dto.currentId, userId);
  }
}
