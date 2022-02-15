import { IsString, MinLength } from 'class-validator';

export class MessageDto {
  @IsString()
  sender: string;

  @IsString()
  dialogId: string;

  @IsString()
  @MinLength(1)
  body: string;
}
