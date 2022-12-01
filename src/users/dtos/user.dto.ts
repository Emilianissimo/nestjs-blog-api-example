import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    is_admin: boolean;

    @Expose()
    created_at: Date;

    @Expose()
    updated_at: Date;    
}
