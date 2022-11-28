import { PostEntity } from "../posts/post.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "src/users/user.entity";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    title: string;

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

    @OneToMany(() => PostEntity, (post) => post.category)
    posts: PostEntity[];

    @ManyToOne(() => UserEntity, (user) => user.categories, {
        cascade: true
    })
    user: UserEntity;
}
