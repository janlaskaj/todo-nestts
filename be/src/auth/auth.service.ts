import { ForbiddenException, Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

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

        return { access_token: await this.signToken(user.id, user.email) }
    }

    signToken(userId: number, email: string) {
        const payload = {
            sub: userId,
            email,
        }

        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET'),
        })
    }
}
