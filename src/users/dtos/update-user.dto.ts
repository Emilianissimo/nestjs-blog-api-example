import { IsEmail, IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsEmail()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    is_admin: boolean;
}
