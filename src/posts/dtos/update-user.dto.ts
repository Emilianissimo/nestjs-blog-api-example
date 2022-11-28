import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePostDTO {
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsNumber()
    @IsOptional()
    category_id: number;
    @IsBoolean()
    @IsOptional()
    is_published: boolean;
}
