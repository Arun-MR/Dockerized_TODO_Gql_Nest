import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class User {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  token: string;
}
