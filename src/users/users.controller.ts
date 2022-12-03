import { Post, Body, Controller, Delete, Get, Header, Param, Patch, Query, UnprocessableEntityException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { JSON_CONTENT_TYPE } from 'src/helpers/constants.helper';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginUserDTO } from './dtos/login-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
@Serialize(UserDTO)
export class UsersController {
    constructor(
        private service: UsersService,
        private authService: AuthService
        ) {}

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req) {
        return this.service.getOne(req.user.id);
    }

    @Post('/sign-up')
    @Header('Content-Type', 'application/json; charset=utf-8')
    public async signUp(@Body() body: CreateUserDTO) {
        const response = await this.authService.signup(body);
        return JSON.stringify(response);
    }

    @Post('/sign-in')
    @Header('Content-Type', 'application/json; charset=utf-8')
    public async signIn(@Body() body: LoginUserDTO) {
        const response = await this.authService.signin(body);
        return JSON.stringify(response);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
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
