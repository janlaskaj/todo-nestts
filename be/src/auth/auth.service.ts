import { Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        const user = await this.prisma.user.create({
            data: { email: dto.email, hash },
        })

        delete user.hash

        return user
    }

    signIn() {
        return 'signin'
    }
}
