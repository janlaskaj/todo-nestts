import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator/'
import { EditUserDto } from './dto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @HttpCode(HttpStatus.OK)
    @Get()
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch()
    async editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
        const user2 = await this.userService.editUser(user.id, dto)
        return user2
    }
}
