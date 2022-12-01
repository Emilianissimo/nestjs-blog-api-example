import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDTO } from 'src/pagination/dtos/page-meta.dto';
import { PageOptionsDTO } from 'src/pagination/dtos/page-options.dto';
import { PageDTO } from 'src/pagination/dtos/page.dto';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

    public findByEmail(email: string) {
        return this.repository.find({where: { email }});
    }

    public async getAll(pageOptionsDto: PageOptionsDTO): Promise<PageDTO<UserDTO>> {
        const [ users, itemCount ] = await this.repository.findAndCount({
            order: {
                created_at: pageOptionsDto.order,
            },
            take: pageOptionsDto.limit,
            skip: pageOptionsDto.offset,
        });

        const pageMeta = new PageMetaDTO({pageOptionsDto, itemCount});

        return new PageDTO(users, pageMeta);
    }
    
    public store(body: CreateUserDTO, hashed_password: string) {
        const user = this.repository.create({
            email: body.email,
            password: hashed_password,
            name: body.name
        });

        return this.repository.save(user);
    }

    public async getOne(id: number) {
        const user = await this.repository.findOne({
            where: {id: id}
        });

        if (!user) {
            throw new NotFoundException('User not found!');
        }

        return user;
    }

    public async update(id: number, attrs: Partial<UserEntity>) {
        const user = await this.getOne(id);

        Object.assign(user, attrs);

        return this.repository.save(user);
    }

    public async remove(id: number) {
        const user = await this.getOne(id);

        return this.repository.remove(user);
    }
}
