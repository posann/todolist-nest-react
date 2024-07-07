import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Todo, TodoSchema } from './todo.model';
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
