import { Resolver, Query, Mutation, Args, Int, Context} from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
// import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [Todo])
  findAllTodos(@Context() context: any):Promise<Todo[]>{
    const headers = context.req.headers;
    console.log('Authorization Header:>>>>>', headers.authorization);
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  // @Mutation(() => Todo)
  // updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
  //   return this.todoService.update(updateTodoInput.id, updateTodoInput);
  // }

  @Mutation(() => Todo)
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.remove(id);
  }
}
