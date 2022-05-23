import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { TodoService } from './todo.service'
import { GetUser } from '../auth/decorator'
import { CreateTodoDto } from './dto/create-todo.dto'

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post()
    async getBookmarks(
        @GetUser('id') userId: number,
        @Body() dto: CreateTodoDto
    ) {
        return await this.todoService.createTodo(dto, userId)
    }
}
