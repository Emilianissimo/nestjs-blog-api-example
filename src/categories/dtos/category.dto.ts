import { Expose, Transform } from "class-transformer";
import { UserEntity } from "src/users/user.entity";

export class CategoryDTO {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;

    @Expose()
    @Transform(({ obj }) => obj.user)
    user: UserEntity;
}
