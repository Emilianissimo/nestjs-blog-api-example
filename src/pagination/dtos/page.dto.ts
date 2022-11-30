import { IsArray } from "class-validator";
import { PageMetaDTO } from "./page-meta.dto";

export class PageDTO<T> {
    @IsArray()
    readonly data: T[];

    readonly meta: PageMetaDTO;

    constructor(data: T[], meta: PageMetaDTO) {
        this.data = data;
        this.meta = meta;
    }
}
