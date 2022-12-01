import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ]
})
export class UsersModule {}
