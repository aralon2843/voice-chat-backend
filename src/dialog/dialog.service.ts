import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DialogModel } from './dialog.model';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(DialogModel) private readonly dialogModel: DialogModel,
  ) {}
}
