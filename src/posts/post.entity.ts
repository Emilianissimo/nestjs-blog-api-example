import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CategoryEntity } from "src/categories/category.entity";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false
    })
    title: string;

    @Column({
        type: "text",
        nullable: true
    })
    description: string;

    @Column({
        default: false
    })
    is_published: boolean;

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
    updated_at_at: Date;
       
    @ManyToOne(() => CategoryEntity, (category) => category.posts, {
        cascade: true
    })
    category: CategoryEntity;
}