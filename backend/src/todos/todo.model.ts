import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TodoStatus {
  TODO = 'To Do',
  INPROCESS = 'In Process',
  DONE = 'Done',
}

@Schema()
export class Todo extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ enum: TodoStatus, default: TodoStatus.TODO })
  status: TodoStatus;

  @Prop({ required: true })
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
