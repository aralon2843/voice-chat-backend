import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DialogModel } from './dialog.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';

@Module({
  providers: [DialogService],
  controllers: [DialogController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: DialogModel,
        schemaOptions: {
          collection: 'Dialog',
        },
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class DialogModule {}
