import { IsString, IsOptional } from 'class-validator'

export class EditTodoDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string
}
