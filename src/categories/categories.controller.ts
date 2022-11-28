import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { SingleCategoryDTO } from './dtos/single-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Controller()
export class CategoriesController {
    constructor(private service: CategoriesService) {}

    @Get()
    index() {
        return this.service.getAll();
    }

    @Post()
    store(@Body() body: CreateCategoryDTO) {
        return this.service.store(body);
    }

    @Get('/:id')
    @Serialize(SingleCategoryDTO)
    show(@Param('id') id: string) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException('User id should be int');
        }
        
        return this.service.getOne(parsedId);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdateCategoryDTO) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException('Post id should be int');
        }

        return this.service.update(parsedId, body);
    }

    @Delete('/:id')
    destroy(@Param('id') id: string) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException('Post id should be int');
        }

        return this.service.remove(parsedId);
    }
}
