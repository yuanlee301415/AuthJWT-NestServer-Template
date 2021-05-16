import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/schemas/user.schema";
import {UserService} from "../user/user.service";

@Injectable()
export class RightsService {
  constructor(
    private readonly userServer: UserService
  ) {
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userServer.create(createUserDto);
  }
}
