import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator/'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @HttpCode(HttpStatus.OK)
    @Get()
    getMe(@GetUser() user: User) {
        return user
    }
}
