import { User } from './model/user.schema';
import { Injectable } from "@nestjs/common";
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly Repository: UserRepository) {}

    create(user: CreateUserDto) {
        //mã hóa mật khóa
        user.password = bcrypt.hashSync(user.password, 10);
        return this.Repository.create(user);
    }

    getAll() {
        return this.Repository.findAll();
    }
    
    getOne(id: string) {
        return this.Repository.findOne(id);
      }
}