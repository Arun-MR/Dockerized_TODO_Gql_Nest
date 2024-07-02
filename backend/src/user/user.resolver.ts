import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.response';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { ForbiddenException } from 'src/Exceptions/forbidden.exception';
import { CONTEXT } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './decorators/roles.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,
    @Inject(CONTEXT) private context: any,
  ) {}

  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    // console.log('first>>>>', createUserInput);
    const { user, token } = await this.userService.create(createUserInput);
    const { email, password } = user;
    // console.log('firsteeerererere', user,token);
    return { email, password, token };
  }
  @Mutation(()=>User)
  async login(@Args('loginUser') loginUser:CreateUserInput ){
    console.log("first",this.context.req.headers)
    const { user, token } = await this.userService.login(loginUser)
    const { email, password } = user;
    console.log(user ,token,"resolver <<<<<<")
    return { email, password, token };
  }


  @Query(() => [User])
  async findAll() {
    const users = await this.userService.findAll();
    // console.log(users, 'findall');
    return users;
  }

  @Query(() => User)
  @Roles('admin')
  @UseGuards(RolesGuard)
  findError() {
    //working but,
    // causes an error Cannot set headers after they are sent to the client
    console.log("error route called")
     throw new ForbiddenException();
  }

}
