import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../src/prisma/prisma.service'
import { AuthDto } from '../src/auth/dto'

describe('App E2E', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()

        app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
        await app.init()
        await app.listen(3333)

        prisma = app.get(PrismaService)
        await prisma.cleanDb()
        pactum.request.setBaseUrl('http://localhost:3333')
    })

    afterAll(() => {
        app.close()
    })

    describe('Auth', () => {
        const dto: AuthDto = {
            email: 'jan@laskaj.com',
            password: '123',
        }
        describe('Signup', () => {
            it('should sign up', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody(dto)
                    .expectStatus(201)
            })

            it('should throw if email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({ ...dto, email: '' })
                    .expectStatus(400)
            })

            it('should throw if password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signup')
                    .withBody({ ...dto, password: '' })
                    .expectStatus(400)
            })
        })
        describe('Signin', () => {
            it('should throw if email is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({ ...dto, email: '' })
                    .expectStatus(400)
            })

            it('should throw if password is empty', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody({ ...dto, password: '' })
                    .expectStatus(400)
            })

            it('should sign in', () => {
                return pactum
                    .spec()
                    .post('/auth/signin')
                    .withBody(dto)
                    .expectStatus(200)
                    .stores('userAt', 'access_token')
            })
        })
    })
    describe('User', () => {
        describe('Getme', () => {
            it('should get current user', () => {
                return pactum
                    .spec()
                    .get('/users')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200)
            })
        })
        describe('Edit user', () => {})
    })
    describe('Bookmark', () => {
        describe('Create bookmark', () => {})
        describe('Get bookmarks', () => {})
        describe('Get bookmark by id', () => {})
        describe('Edit bookmark by id', () => {})
        describe('Delete bookmark by id', () => {})
    })
})
