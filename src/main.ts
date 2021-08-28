import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // get  certifications to use https
    httpsOptions: {
      ca: null,
      cert: null,
      key: null,
      rejectUnauthorized: false
    }
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
