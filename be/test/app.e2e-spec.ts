import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { AppModule } from '../src/app.module'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from '../src/prisma/prisma.service'
import { AuthDto } from '../src/auth/dto'
import { CreateBookmarkDto } from '../src/bookmark/dto'
import { CreateTodoDto } from '../src/todo/dto/create-todo.dto'
import { EditUserDto } from '../src/user/dto'
import { EditTodoDto } from '../src/todo/dto/edit-todo.dto'

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
    })

    describe('Todo', () => {
        const dto: CreateTodoDto = {
            title: 'test title',
            description: 'test description',
        }

        describe('Create todo', () => {
            it('should not be authorized to create todo', () => {
                return pactum
                    .spec()
                    .post('/todo')
                    .withBody(dto)
                    .expectStatus(401)
            })

            it('should create todo', () =>
                pactum
                    .spec()
                    .post('/todo')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .stores('todoId', 'id')
                    .expectBodyContains(dto.title)
                    .expectBodyContains(dto.description))
        })

        describe('Get todos', () => {
            it('should not be authorized to get todos', () => {
                return pactum.spec().get('/todo').expectStatus(401)
            })

            it('should get todos', () => {
                return pactum
                    .spec()
                    .get('/todo')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200)
                    .expectBodyContains(dto.title)
                    .expectBodyContains(dto.description)
            })
        })

        describe('Get todo by id', () => {
            it('should not return non-existing todo', () => {
                return pactum
                    .spec()
                    .get('/todo/999')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(404)
            })

            it('should get todo by id', () => {
                return pactum
                    .spec()
                    .get('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(200)
                    .expectBodyContains(dto.title)
                    .expectBodyContains(dto.description)
            })
        })

        describe('Edit todo by id', () => {
            const editDto: EditTodoDto = {
                title: 'New Title',
                description: 'New Description',
            }

            const editDto2: EditTodoDto = {
                title: 'New Title2',
                description: 'New Description2',
            }

            it('should fail with empty body', () => {
                return pactum
                    .spec()
                    .patch('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(400)
            })

            it('should update only todo title', () => {
                return pactum
                    .spec()
                    .patch('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody({ title: editDto.title })
                    .expectStatus(200)
                    .expectBodyContains(editDto.title)
                    .expectBodyContains(dto.description)
            })

            it('should update only todo description', () => {
                return pactum
                    .spec()
                    .patch('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody({ description: editDto.description })
                    .expectStatus(HttpStatus.OK)
                    .expectBodyContains(editDto.title)
                    .expectBodyContains(editDto.description)
            })

            it('should update todo ', () => {
                return pactum
                    .spec()
                    .patch('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(editDto2)
                    .expectStatus(HttpStatus.OK)
                    .expectBodyContains(editDto2.title)
                    .expectBodyContains(editDto2.description)
            })
        })
        describe('Delete todo by id', () => {
            it('should delete todo ', () => {
                return pactum
                    .spec()
                    .delete('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(HttpStatus.OK)
            })

            it('should not return todo ', () => {
                return pactum
                    .spec()
                    .get('/todo/$S{todoId}')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .expectStatus(404)
            })
        })
    })

    describe('Bookmark', () => {
        describe('Create bookmark', () => {
            it('should create bookmark', () => {
                const dto: CreateBookmarkDto = {
                    title: 'Test title',
                }

                return pactum
                    .spec()
                    .post('/bookmarks')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(201)
                    .expectBodyContains(dto.title)
                    .stores('bookmarkId', 'id')
            })
        })
        describe('Get bookmarks', () => {
            it('should get bookmarks', () => {
                const dto: CreateBookmarkDto = {
                    title: 'Test title',
                }

                return pactum
                    .spec()
                    .get('/bookmarks')
                    .withHeaders({
                        Authorization: 'Bearer $S{userAt}',
                    })
                    .withBody(dto)
                    .expectStatus(200)
                    .expectBodyContains(dto.title)
            })
        })
        describe('Get bookmark by id', () => {})
        describe('Edit bookmark by id', () => {})
        describe('Delete bookmark by id', () => {})
    })
})
