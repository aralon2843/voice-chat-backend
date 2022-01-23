import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FollowUnfollowDto } from './dto/follow-unfollow.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all/:id')
  async getAllUsers(@Param('id') id: string) {
    return this.userService.getAllUsers(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-picture/:id')
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.userService.uploadProfilePicture(id, file);
  }
}
