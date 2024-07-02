import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

const user = { "id": "123456",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "roles": [ "admin"],
  "firstName": "John",
  "lastName": "Doe" }

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req,res }) => ({ req,res, user }),
    }),
  ],
})
export class GraphqlModule {}
