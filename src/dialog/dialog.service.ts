import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DIALOG_NOT_FOUND_ERROR } from './dialog.constants';
import { DialogModel } from './dialog.model';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(DialogModel)
    private readonly dialogModel: ModelType<DialogModel>,
  ) {}

  async create(members: CreateDialogDto): Promise<DocumentType<DialogModel>> {
    const dialog = new this.dialogModel({
      members,
    });

    return dialog.save();
  }

  async findDialog(members) {
    const dialog = await this.dialogModel.find({ members });
    if (!dialog) {
      throw new NotFoundException(DIALOG_NOT_FOUND_ERROR);
    }
    return dialog;
  }
}
