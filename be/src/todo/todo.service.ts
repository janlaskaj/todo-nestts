import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto } from './dto/create-todo.dto'

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async createTodo(dto: CreateTodoDto, userId: number) {
        try {
            const todo = await this.prisma.todo.create({
                data: {
                    userId,
                    ...dto,
                },
            })

            return todo
        } catch (e) {
            return e
        }
    }
}
