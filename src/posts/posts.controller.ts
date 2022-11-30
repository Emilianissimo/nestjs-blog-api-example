import { Controller, Get, Post, Body, Param, BadRequestException, Patch, Delete, Query, Header } from '@nestjs/common';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { PostDTO } from './dtos/post.dto';
import { UpdatePostDTO } from './dtos/update-user.dto';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { PageDTO } from 'src/pagination/dtos/page.dto';

@Controller()
@Serialize(PostDTO)
export class PostsController {
    constructor(private service: PostsService) {}

    @Get()
    @Header('Content-Type', 'application/json; charset=utf-8')
    async index(@Query() pageOptionsDto: PageOptionsDTO): Promise<string> {
        const response = await this.service.getAll(pageOptionsDto);
        return JSON.stringify(response);
        // TODO dunno why but it's returning an empty object
        // return this.service.getAll(pageOptionsDto);
    }

    @Post()
    store(@Body() body: CreatePostDTO) {
        return this.service.store(body);
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new BadRequestException('User id should be int');
        }
        
        return this.service.getOne(parsedId);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdatePostDTO) {
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
