import { NestFactory } from '@nestjs/core';
import { mongoose } from '@typegoose/typegoose';
import { AppModule } from './app.module';

const mongoDBUrl =
  'mongodb+srv://aralon2843:qwertyslav1234@cluster0.jgaku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await mongoose.connect(mongoDBUrl);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
