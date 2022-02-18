import { IsArray, IsString } from 'class-validator';

export class CreateDialogDto {
  @IsArray()
  @IsString({ each: true })
  members: string[];
}
