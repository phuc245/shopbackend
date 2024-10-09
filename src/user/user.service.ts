import { User } from './model/user.schema';
import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ParamPaginationDto } from '../comon/param-pagination.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Role } from 'src/auth/decorator/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly repository: UserRepository) {}

  async create(user: CreateUserDto) {
    // mã hoá mật khẩu
    user.password = bcrypt.hashSync(user.password, 10);

    try {
      return await this.repository.create(user);
    } catch (error) {
      throw new UnprocessableEntityException('email đã tồn tại');
    }
  }

  getAll(param: ParamPaginationDto) {
    const { keyword, page, limit, sort } = param;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    const filter =
      keyword !== undefined
        ? {
            $or: [
              { name: new RegExp(keyword, 'i') },
              { email: new RegExp(keyword, 'i') },
            ],
          }
        : {};

    return this.repository.findAll(page, limit, newSort, filter);
  }

  async getOne(id: string) {
    const user = await this.repository.findOne(id, '-password');
    if (!user) {
      throw new NotFoundException('Không tìm thấy user');
    }
    return user;
  }
  async updateUser(id: string, updateUser: UpdateUserDto) {
    const user = await this.repository.UpdateUser(id, updateUser);
    if (!user) {
      throw new NotFoundException('Không tìm thay user');
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.repository.deleteUser(id);
    if (!user) {
      throw new NotFoundException('Không tìm thay user');
    }
    return user;
  }

  async updateStatusUser(id: string, status: boolean) {
    const user = await this.repository.updateStatusUser(id, status);
    if (!user) {
      throw new NotFoundException('Không tìm thay user');
    }
    return user;
  }

  async onModuleInit(): Promise<void> {
    const createUserAdmin: CreateUserDto = {
      email: 'admin@gmail.com',
      name: 'phuc',
      password: '123456Phuc!',
      status: true,
      role: [Role.ADMIN],
    };
    const initInDB = await this.repository.findByEmail(createUserAdmin.email);
    if (!initInDB) {
      await this.repository.create({
        ...createUserAdmin,
        password: await bcrypt.hash(createUserAdmin.password, 10),
      });
    }
  }
}
