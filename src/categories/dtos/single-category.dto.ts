import { Expose, Transform } from "class-transformer";
import { PageDTO } from "src/pagination/dtos/page.dto";
import { PostEntity } from "src/posts/post.entity";
import { UserEntity } from "src/users/user.entity";

export class SingleCategoryDTO {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Expose()
    @Transform(({ obj }) => obj.posts)
    posts: PageDTO<PostEntity>;

    @Expose()
    @Transform(({ obj }) => obj.user)
    user: UserEntity;
}
