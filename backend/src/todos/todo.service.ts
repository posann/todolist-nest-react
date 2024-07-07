import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoStatus } from './todo.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: any, userId: string): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      userId,
    });
    return createdTodo.save();
  }

  async findAll() {
    const todos = await this.todoModel.find().exec();
    return { message: 'success', data: todos };
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    return this.todoModel.findOne({ _id: id, userId }).exec();
  }

  async update(id: string, updateTodoDto: any): Promise<Todo> {
    return this.todoModel
      .findOneAndUpdate({ _id: id }, updateTodoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Todo> {
    return this.todoModel.findOneAndDelete({ _id: id }).exec();
  }
}
