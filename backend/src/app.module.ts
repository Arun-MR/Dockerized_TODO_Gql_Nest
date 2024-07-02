import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from './Exceptions/http-exception.filter';

@Module({
  imports: [GraphqlModule, DatabaseModule, UserModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER, // defining exception handler globally 
    useClass: GraphQLExceptionFilter,
  },],
})
export class AppModule {}
