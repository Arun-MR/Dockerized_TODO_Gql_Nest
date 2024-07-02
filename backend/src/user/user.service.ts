import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import generateToken from 'src/jwt/generateToken';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserInput: CreateUserInput) {
    const { email, password } = createUserInput;
    const user = this.repo.create({ email, password });
    const savedUser = await this.repo.save(user);
    const token = generateToken(savedUser);
    return { user: savedUser, token: token };
  }

  async findAll() {
    const users = await this.repo.find();
    return users;
  }

  async login (loginUser:CreateUserInput){
    const {email,password} = loginUser
    const user = await this.repo.findOneBy({email:email})
    if(user){
      if(user.password===password){
        const token = generateToken(user);
        console.log("login successfull")
        return {user:user,token:token}
      }
    }else{
      console.log(" user not found try logging in again ")
    }
    
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
