import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { DIALOG_ALREADY_EXISTED_ERROR } from './dialog.constants';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Post('create')
  async create(@Body() dto: CreateDialogDto) {
    const dialog = await this.dialogService.findDialog(dto);
    if (dialog) {
      throw new BadRequestException(DIALOG_ALREADY_EXISTED_ERROR);
    }

    return await this.dialogService.create(dto);
  }
}
