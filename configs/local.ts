import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/configs/config.service';

export const InitializePgdbConnection = TypeOrmModule.forRoot(
  configService.initializePgdbConfig(),
);

console.log(process.env.PGDB_PORT, process.env.PGDB_HOST);
export const mapEnvVariables = () => ({
  tier: process.env.TIER,
  appPort: process.env.APP_PORT,
  database: {
    port: process.env.PGDB_PORT,
    host: parseInt(process.env.PGDB_HOST, 10) || 5432,
    user: process.env.PGDB_USER,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_DATABASE,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callBackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

@Module({
  exports: [InitializePgdbConnection, mapEnvVariables],
})
export class InitPgdbModule {}
