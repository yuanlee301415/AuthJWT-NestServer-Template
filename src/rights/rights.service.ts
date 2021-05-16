import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {User} from "../users/schemas/user.schema";
import {UsersService} from "../users/users.service";

@Injectable()
export class RightsService {
  constructor(
    private readonly usersServer: UsersService
  ) {
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersServer.create(createUserDto);
  }
}
