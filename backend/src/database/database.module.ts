import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      //TypeOrmModuleOptions: This interface from TypeORM helps ensure that the configuration object conforms to the expected format.
      type: 'postgres',
      host: 'postgresData',
      port: 5432,
      username: 'myuser',
      password: 'password',
      database: 'mydatabase',
      entities: [User,Todo], // Registering User entity
      synchronize: true,
      logging: true,
      logger: 'advanced-console', // Use advanced console logging
    }),
  ],
})
export class DatabaseModule {}
