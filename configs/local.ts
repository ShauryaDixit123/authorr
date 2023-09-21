import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/configs/config.service';

export const InitializePgdbConnection = TypeOrmModule.forRoot(
  configService.initializePgdbConfig(),
);

console.log(process.env.PGDB_PORT, process.env.PGDB_HOST);
export const mapEnvVariables = () => ({
  host: process.env.PGDB_HOST,
  database: {
    port: process.env.PGDB_PORT,
    host: parseInt(process.env.PGDB_HOST, 10) || 5432,
    user: process.env.PGDB_USER,
    password: process.env.PGDB_PASSWORD,
    database: process.env.PGDB_DATABASE,
  },
});
@Module({
  exports: [InitializePgdbConnection, mapEnvVariables],
})
export class InitPgdbModule {}
