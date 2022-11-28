import { PostEntity } from "src/posts/post.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CategoryEntity } from "../categories/category.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        default: false
    })
    is_admin: boolean;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP()"
    })
    created_at: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP()",
        onUpdate: "CURRENT_TIMESTAMP()"
    })
    updated_at: Date;

    @OneToMany(() => PostEntity, (post) => post.user)
    posts: PostEntity[];

    @OneToMany(() => CategoryEntity, (category) => category.user)
    categories: CategoryEntity[];
}
