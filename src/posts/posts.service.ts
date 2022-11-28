import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>) {}

    public getAll() {
        return this.repository.find({relations: {
            category: true,
            user: true
        }});
    }

    public async store(body: CreatePostDTO) {
        const post = this.repository.create(body);
        post.categoryId = body.category_id;
        return this.repository.save(post);
    }

    public getOne(id: number) {
        return this.repository.findOne({
            where: {id: id},
            relations: {
                category: true,
                user: true
            }
        });
    }

    public async update(id: number, attrs: Partial<PostEntity>) {
        const post = await this.getOne(id);
        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        Object.assign(post, attrs);

        return this.repository.save(post);
    }

    public async remove(id: number) {
        const post = await this.getOne(id);
        if (!post) {
            throw new NotFoundException('Post not found!');
        }

        return this.repository.remove(post);
    }
}
