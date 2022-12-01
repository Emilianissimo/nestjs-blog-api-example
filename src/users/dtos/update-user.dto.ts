import { IsEmail, IsString, IsOptional } from "class-validator";

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
}
