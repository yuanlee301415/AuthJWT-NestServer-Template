import {User} from "../../users/schemas/user.schema";

export type AuthUser = Pick<User, "_id" | "username">;
