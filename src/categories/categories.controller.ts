import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import { JSON_CONTENT_TYPE } from 'src/helpers/constants.helper';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dtos/category.dto';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { SingleCategoryDTO } from './dtos/single-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Controller()
export class CategoriesController {
    constructor(private service: CategoriesService) {}

    @Get()
    @Header('Content-Type', JSON_CONTENT_TYPE)
    async index(@Query() pageOptionsDto: PageOptionsDTO): Promise<string> {
        const response = await this.service.getAll(pageOptionsDto);
        return JSON.stringify(response);
    }

    @Post()
    store(@Body() body: CreateCategoryDTO) {
        return this.service.store(body);
    }

    @Get('/:id')
    @Serialize(SingleCategoryDTO)
    @Header('Content-Type', JSON_CONTENT_TYPE)
    async show(@Param('id') id: string, @Query() pageOptionsDto: PageOptionsDTO): Promise<string> {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException('User id should be int');
        }
        const response = await this.service.getOne(parsedId, pageOptionsDto);

        return JSON.stringify(response);
    }

    @Patch('/:id')
    @Serialize(CategoryDTO)
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
