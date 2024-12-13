/*eslint-disable prettier/prettier  */

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

// Importa tus módulos, por ejemplo el de categorías
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { ImageModule } from './modules/images/image.module';
import { RangosModule } from './modules/rangos/rangos.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Carga el .env
    ConfigModule.forRoot({
      isGlobal: true, // Para que las variables estén disponibles en todo el proyecto
      envFilePath: '.env',
    }),

    // Configuración dinámica de TypeORM según DB_TYPE
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const dbType = process.env.DB_TYPE as 'mysql' | 'postgres';
        let host, port, username, password, database;

        if (dbType === 'mysql') {
          host = process.env.MYSQL_HOST;
          port = parseInt(process.env.MYSQL_PORT, 10);
          username = process.env.MYSQL_USER;
          password = process.env.MYSQL_PASSWORD;
          database = process.env.MYSQL_DATABASE;
        } else {
          host = process.env.POSTGRES_HOST;
          port = parseInt(process.env.POSTGRES_PORT, 10);
          username = process.env.POSTGRES_USER;
          password = process.env.POSTGRES_PASSWORD;
          database = process.env.POSTGRES_DATABASE;
        }

        return {
          type: dbType,
          host,
          port,
          username,
          password,
          database,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: false, 
          migrationsRun: true,
        };
      },
    }),

    CategoriesModule,

    UsersModule,

    RolesModule,

    ImageModule,

    RangosModule,
    AuthModule
  ],
})
export class AppModule {}
