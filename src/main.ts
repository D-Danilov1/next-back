import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://www.next-payment.site',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  await app.listen(port).then(() => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
bootstrap();
