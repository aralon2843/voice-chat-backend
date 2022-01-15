import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/configs/jwt.config';
import { UserModel } from './user.model';

@Module({
  providers: [UserService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
