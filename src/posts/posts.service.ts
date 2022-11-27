import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>) {}

    public getAll() {
        return this.repository.find();
    }

    public store(body: CreatePostDto) {
        const post = this.repository.create(body);
        return this.repository.save(post);
    }
}
