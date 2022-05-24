import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { TodoService } from './todo.service'
import { GetUser } from '../auth/decorator'
import { CreateTodoDto } from './dto/create-todo.dto'
import { EditTodoDto } from './dto/edit-todo.dto'

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Post()
    async createTodo(
        @GetUser('id') userId: number,
        @Body() dto: CreateTodoDto
    ) {
        return await this.todoService.createTodo(dto, userId)
    }

    @Get()
    getTodos(@GetUser('id') userId: number) {
        return this.todoService.getTodos(userId)
    }

    @Get(':id')
    getTodo(@Param('id', ParseIntPipe) todoId: number) {
        return this.todoService.getTodo(todoId)
    }

    @Patch(':id')
    editTodo(
        @Param('id', ParseIntPipe) todoId: number,
        @Body() dto: EditTodoDto
    ) {
        return this.todoService.editTodo(todoId, dto)
    }

    @Delete(':id')
    deleteTodo(@Param('id', ParseIntPipe) todoId: number) {
        return this.todoService.deleteTodo(todoId)
    }

    @Post('toggle/:id')
    toggleTodo(@Param('id', ParseIntPipe) todoId: number) {
        return this.todoService.toggleTodo(todoId)
    }
}
