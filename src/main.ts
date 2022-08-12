import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import * as momentTimezone from 'moment-timezone';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'https://localhost:8080', //vue
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription(
      'Documentação smartraking api',
    )
    .setVersion('1.0')
    .addTag('jogadores')
    .addTag('categorias')
    .addTag('desafios')
    .addTag('usuarios')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter())

  Date.prototype.toJSON = function(): any{
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  await app.listen(8081);
}
bootstrap();
