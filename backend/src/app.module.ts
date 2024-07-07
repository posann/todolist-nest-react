import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { mongodbConfig } from './config/mongodb.config';
import { TodosModule } from './todos/todo.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri),
    TodosModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
