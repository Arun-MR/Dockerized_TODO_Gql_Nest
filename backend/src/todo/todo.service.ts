import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
// import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo:Repository<Todo>){}
  
  async create(createTodoInput: CreateTodoInput) {
    const {title}= createTodoInput
   const todo =   this.repo.create({title})
    const result = await this.repo.save(todo)
    console.log(result ,"todo created <<<<<<<<<")
    return result;

  }

 async  findAll() {
    const result = await this.repo.find()
    // console.log(result , "list of todos in service ")

    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  // update(id: number, updateTodoInput: UpdateTodoInput) {
  //   return `This action updates a #${id} todo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
