import { AppService } from './app.service';
import { CacheModule, MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { routes } from 'routes/api';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { PostEntity } from './posts/post.entity';
import { CategoryEntity } from './categories/category.entity';
import { UserEntity } from './users/user.entity';

require('dotenv').config();

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
            return {
                type: 'postgres',
          
                host: process.env['DB_HOST'],
                port: parseInt(process.env['DB_PORT']),
                username: process.env['DB_USERNAME'],
                password: process.env['DB_PASSWORD'],
                database: process.env['DB_NAME'],
          
                entities: [
                    PostEntity,
                    CategoryEntity,
                    UserEntity
                ],
          
                migrationsTableName: 'migration',
          
                migrations: ['src/migration/*.ts'],
          
                ssl: process.env['MODE'] === 'PROD' ? true : false,
      
                synchronize: process.env['MODE'] === 'PROD' ? false : true
            }
        }
    }),
    UsersModule,
    PostsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ],
})
export class AppModule {
}
