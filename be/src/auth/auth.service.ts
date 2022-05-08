import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: { email: dto.email, hash },
            })

            delete user.hash

            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // duplicate email
                if ((error.code = 'P2002')) {
                    throw new ForbiddenException('Credentials taken')
                }
            }

            throw error
        }
    }

    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        })

        if (!user) throw new ForbiddenException('Credentials incorrect')

        const pwdMatch = await argon.verify(user.hash, dto.password)

        if (!pwdMatch) throw new ForbiddenException('Credentials incorrect')

        delete user.hash
        return user
    }
}
