import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${process.env.APP_PORT}`);
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(availableRoutes);
}

async function redisApp() {
  NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
    },
  });
}
bootstrap();
// redisApp();
