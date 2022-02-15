import { getMongoConfig } from './configs/mongo.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MessageModule } from './message/message.module';
import { MessageGateway } from './message/message.gateway';
import { DialogModule } from './dialog/dialog.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    PostModule,
    MessageModule,
    DialogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
