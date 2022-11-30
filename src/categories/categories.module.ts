import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryEntity } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/post.entity';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      PostEntity
    ]),
  ]
})
export class CategoriesModule {}
