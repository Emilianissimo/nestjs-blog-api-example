import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
    constructor(private service: PostsService) {}

    @Get()
    index() {
        return this.service.getAll();
    }

    @Post()
    store(@Body() body: CreatePostDto) {
        return this.service.store(body);
    }
}
