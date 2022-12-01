import { BadRequestException, Body, Controller, Delete, Get, Header, Param, Patch, Query, UnprocessableEntityException } from '@nestjs/common';
import { JSON_CONTENT_TYPE } from 'src/helpers/constants.helper';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
@Serialize(UserDTO)
export class UsersController {
    constructor(private service: UsersService) {}

    @Get()
    @Header('Content-Type', JSON_CONTENT_TYPE)
    async index(@Query() pageOptionsDto: PageOptionsDTO): Promise<string> {
        const response = await this.service.getAll(pageOptionsDto);
        return JSON.stringify(response);
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new UnprocessableEntityException('User id should be int');
        }

        return this.service.getOne(parsedId);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new UnprocessableEntityException('User id should be int');
        }

        return this.service.update(parsedId, body);
    }

    @Delete('/:id')
    destroy(@Param('id') id: string) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            throw new UnprocessableEntityException('User id should be int');
        }

        return this.service.remove(parsedId);
    }
}
