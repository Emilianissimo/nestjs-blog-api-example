import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {}

    public getAll() {
        return this.repository.find();
    }

    public store(body: CreateCategoryDTO) {
        const category = this.repository.create(body);

        return this.repository.save(category);
    }

    public getOne(id: number) {
        return this.repository.findOne({ 
            where: {id: id}, 
            relations: ['posts', 'user'] 
        });
    }

    public async update(id: number, attrs: Partial<CategoryEntity>) {
        const category = await this.getOne(id);
        if (!category) {
            throw new NotFoundException('Post not found!');
        }

        Object.assign(category, attrs);

        return this.repository.save(category);
    }

    public async remove(id: number) {
        const category = await this.getOne(id);
        if (!category) {
            throw new NotFoundException('Post not found!');
        }
        
        return this.repository.remove(category);
    }
}
