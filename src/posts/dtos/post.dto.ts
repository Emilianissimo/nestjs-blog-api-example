import { Expose, Transform } from "class-transformer";
import { UserEntity } from "src/users/user.entity";
import { CategoryEntity } from "../../categories/category.entity";

export class PostDTO {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    is_published: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Expose()
    @Transform(({ obj }) => obj.category)
    category: CategoryEntity;

    @Expose()
    @Transform(({ obj }) => obj.user)
    user: UserEntity;
}
