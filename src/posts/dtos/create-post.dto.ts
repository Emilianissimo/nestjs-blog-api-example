import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    category_id: number;
    @IsBoolean()
    @IsOptional()
    is_published: boolean;
}
