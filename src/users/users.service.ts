import {Injectable, Inject, BadRequestException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import {User, UserDocument} from "./schemas/user.schema";
import {CryptoUtil} from "../common/utils/crypto.util";
import {PageQuery} from "../common/interfaces/PageQuery";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
    const ex = await this.findByUsername(newUser.username);
    console.log("UsersService>create>ex:", ex);
    if (ex) {
      throw new BadRequestException("用户已存在！");
      return;
    }

    const ret = await this.userModel.create({
      ...newUser,
      password: this.cryptoUtil.encryptPassword(createUserDto.password),
      createdAt: new Date(),
    });
    return this.findById(ret._id)
  }

  async findAll({page, size}: PageQuery): Promise<[User[], number]> {
    console.log("UsersService>findAll>query:", {page, size});
    const users = await this.userModel
      .find(null, {password: 0})
      .sort({createdAt: -1})
      .skip((page - 1) * size)
      .limit(size);
    const count = await this.userModel.countDocuments();
    return [users, count];
  }

  async findById(id: string): Promise<User> {
    console.log("UsersService>findById>id:\n", id);
    return this.userModel.findById(id, {password: 0});
  }

  async findByUsername(username: string): Promise<User> {
    console.log("UsersService>findByUsername>username:", username);
    return this.userModel.findOne({username});
  }

  async deleteOne(id: string): Promise<User> {
    const ret = await this.userModel.findByIdAndRemove(id);
    console.log("UserService>deleteOne>ret:", ret);
    return ret;
  }
}
