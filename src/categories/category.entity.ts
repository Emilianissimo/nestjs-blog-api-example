import { PostEntity } from "../posts/post.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    title: string;

    @OneToMany(() => PostEntity, (post) => post.category)
    posts: PostEntity[];
}