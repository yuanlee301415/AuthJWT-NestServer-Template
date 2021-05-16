import {User} from "../../user/schemas/user.schema";

export type AuthUser = Pick<User, "_id" | "username">;
