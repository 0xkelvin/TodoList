import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepsitory: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepsitory.save(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepsitory.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepsitory.findOne(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      await this.todoRepsitory.update(id, updateTodoDto);
      return this.todoRepsitory.findOne(id);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.todoRepsitory.delete(id);
  }
}
