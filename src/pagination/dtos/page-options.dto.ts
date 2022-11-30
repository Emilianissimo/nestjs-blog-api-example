import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, Min } from "class-validator";

export enum Order {
    ASC = "ASC",
    DESC = "DESC",
}

export class PageOptionsDTO {
    @IsEnum(Order)
    @IsOptional()
    readonly order: Order = Order.ASC;

    @Transform(({ value }) => parseInt(value))
    @Min(1)
    @IsNumber()
    @IsOptional()
    readonly page: number = 1;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    @IsOptional()
    readonly limit: number = 10;

    get offset(): number {
        return (this.page - 1) * this.limit;
    }
}
