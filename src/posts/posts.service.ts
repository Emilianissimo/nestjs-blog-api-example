import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostEntity } from './post.entity';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { PageDTO } from 'src/pagination/dtos/page.dto';
import { PostDTO } from './dtos/post.dto';
import { PageMetaDTO } from 'src/pagination/dtos/page-meta.dto';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>) {}

    public async getAll(pageOptionsDto: PageOptionsDTO): Promise<PageDTO<PostDTO>> {
        const [ posts, itemCount ] = await this.repository.findAndCount({
            relations: {
                category: true,
                user: true
            },
            order: {
                created_at: pageOptionsDto.order
            },
            take: pageOptionsDto.limit,
            skip: pageOptionsDto.offset,
        });

        const pageMeta = new PageMetaDTO({pageOptionsDto, itemCount});

        return new PageDTO(posts, pageMeta);
    }

    public async store(body: CreatePostDTO) {
        const post = this.repository.create(body);
        post.categoryId = body.category_id;
        return this.repository.save(post);
    }

    public async getOne(id: number) {
        const post = this.repository.findOne({
            where: {id: id},
            relations: {
                category: true,
                user: true
            }
        });
        if (!post) {
            throw new NotFoundException('Category not found!');
        }
        return post;
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
