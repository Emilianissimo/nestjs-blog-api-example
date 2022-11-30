import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDTO } from 'src/pagination/dtos/page-meta.dto';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { PageDTO } from 'src/pagination/dtos/page.dto';
import { PostEntity } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryDTO } from './dtos/category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { SingleCategoryDTO } from './dtos/single-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>,
        @InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>
        ) {}

    public async getAll(pageOptionsDto: PageOptionsDTO): Promise<PageDTO<CategoryDTO>> {
        const [ categories, itemCount ] = await this.repository.findAndCount({
            relations: {
                user: true,
            },
            order: {
                created_at: pageOptionsDto.order,
            },
            take: pageOptionsDto.limit,
            skip: pageOptionsDto.offset,
        });

        const pageMeta = new PageMetaDTO({pageOptionsDto, itemCount});

        return new PageDTO(categories, pageMeta);
    }

    public store(body: CreateCategoryDTO) {
        const category = this.repository.create(body);

        return this.repository.save(category);
    }

    public async getOne(id: number, pageOptionsDto: PageOptionsDTO): Promise<SingleCategoryDTO> {
        let category: CategoryEntity = await this.repository.findOne({ 
            where: {id: id}, 
            relations: {
                user: true
            } 
        })
        if (!category) {
            throw new NotFoundException('Category not found!');
        }

        const [ posts, itemCount ] = await this.postsRepository.findAndCount({
            relations: {
                category: true,
                user: true
            },
            where: {
                categoryId: id
            },
            order: {
                created_at: pageOptionsDto.order
            },
            take: pageOptionsDto.limit,
            skip: pageOptionsDto.offset,
        });

        const pageMeta = new PageMetaDTO({pageOptionsDto, itemCount});
        
        return {
            id: category.id,
            title: category.title,
            created_at: category.created_at,
            updated_at: category.updated_at,
            user: category.user,
            posts: new PageDTO(posts, pageMeta)
        };
    }

    public async update(id: number, attrs: Partial<CategoryEntity>) {
        const category = await this.repository.findOne({ 
            where: {id: id}, 
            relations: {
                user: true
            } 
        });
        if (!category) {
            throw new NotFoundException('Category not found!');
        }

        Object.assign(category, attrs);

        return this.repository.save(category);
    }

    public async remove(id: number) {
        const category = await this.repository.findOne({ 
            where: {id: id}, 
            relations: {
                user: true
            } 
        });
        if (!category) {
            throw new NotFoundException('Category not found!');
        }
        
        return this.repository.remove(category);
    }
}
