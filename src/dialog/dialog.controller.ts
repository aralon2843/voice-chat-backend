import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { DIALOG_ALREADY_EXISTED_ERROR } from './dialog.constants';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Post('create')
  async create(@Body() dto: CreateDialogDto) {
    return await this.dialogService.create(dto.members);
  }

  @Get(':userId')
  async getDialogsByUserId(@Param('userId') userId: string) {
    return await this.dialogService.findByUserId(userId);
  }
}
