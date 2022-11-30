import { PageMetaDTOParameters } from "../interfaces/page-meta-dto-parameters.interface";

export class PageMetaDTO {
    readonly page: number;
    readonly limit: number;
    readonly item_count: number;
    readonly page_count: number;
    readonly has_previous_page: boolean;
    readonly has_next_page: boolean;

    constructor({
        pageOptionsDto,
        itemCount
    }: PageMetaDTOParameters) {
        this.page = pageOptionsDto.page;
        this.limit = pageOptionsDto.limit;
        this.item_count = itemCount;
        this.page_count = Math.ceil(this.item_count / this.limit);
        this.has_previous_page = this.page > 1;
        this.has_next_page = this.page < this.page_count;
    }
}
