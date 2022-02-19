import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import {
  DIALOG_ALREADY_EXISTED_ERROR,
  DIALOG_NOT_FOUND_ERROR,
} from './dialog.constants';
import { DialogModel } from './dialog.model';
import { CreateDialogDto } from './dto/create-dialog.dto';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(DialogModel)
    private readonly dialogModel: ModelType<DialogModel>,
  ) {}

  async create(members: string[]): Promise<DocumentType<DialogModel>> {
    const dialog = await this.dialogModel.findOne({ members });
    console.log(!!dialog)
    if (!!dialog) {
      throw new BadRequestException(DIALOG_ALREADY_EXISTED_ERROR);
    }

    const newDialog = new this.dialogModel({
      members,
    });

    return newDialog.save();
  }

  async delete(id): Promise<DocumentType<DialogModel> | null> {
    const dialog = await this.dialogModel.findByIdAndDelete(id);

    if (!dialog) {
      throw new NotFoundException(DIALOG_NOT_FOUND_ERROR);
    }

    return dialog;
  }

  async findByUserId(
    userId: string,
  ): Promise<DocumentType<DialogModel>[] | null> {
    const dialogs = await this.dialogModel.find({
      members: { $in: [userId] },
    });

    if (!(dialogs.length > 0)) {
      throw new NotFoundException(DIALOG_NOT_FOUND_ERROR);
    }

    return dialogs;
  }
}
