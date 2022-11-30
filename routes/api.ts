import { AppModule } from "../src/app.module";
import { CategoriesModule } from "../src/categories/categories.module";
import { PostsModule } from "../src/posts/posts.module";
import { UsersModule } from "../src/users/users.module";

export const routes = [
    {
        path: "/api",
        module: AppModule,
        children: [
            {
                path: '/posts',
                module: PostsModule,
            },
            {
                path: '/categories',
                module: CategoriesModule,
            },
            {
                path: '/users',
                module: UsersModule,
            },
        ],
    }
];