import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { Todo } from 'prisma'
import { EditTodoDto } from './dto/edit-todo.dto'

@Injectable()
export class TodoService {
    constructor(private prisma: PrismaService) {}

    async createTodo(dto: CreateTodoDto, userId: number) {
        try {
            return await this.prisma.todo.create({
                data: {
                    userId,
                    ...dto,
                },
            })
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getTodos(userId: number) {
        try {
            return await this.prisma.todo.findMany({ where: { userId } })
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getTodo(todoId: number) {
        let todo: Todo | null
        try {
            todo = await this.prisma.todo.findUnique({
                where: { id: todoId },
            })
        } catch (e) {
            throw new BadRequestException(e)
        } finally {
            if (!todo) {
                throw new NotFoundException()
            }

            return todo
        }
    }

    async editTodo(todoId: number, dto: EditTodoDto) {
        if (!dto.title && !dto.description)
            throw new BadRequestException('no input provided')

        const todo = await this.prisma.todo.findUnique({
            where: { id: todoId },
        })

        if (!todo) {
            throw new BadRequestException('ID does not exist')
        }

        try {
            const newTodo = await this.prisma.todo.update({
                where: { id: todoId },
                data: { ...dto },
            })

            return newTodo
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async deleteTodo(todoId: number) {
        return await this.prisma.todo.delete({ where: { id: todoId } })
    }

    async toggleTodo(todoId: number) {
        let done: boolean
        try {
            const todo = await this.prisma.todo.findUnique({
                where: { id: todoId },
            })

            done = !todo.done
        } catch (e) {
            throw new BadRequestException(e)
        }

        return await this.prisma.todo.update({
            where: { id: todoId },
            data: { done },
        })
    }
}
