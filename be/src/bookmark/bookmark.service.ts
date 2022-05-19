import { Delete, Get, Injectable, Patch, Post } from '@nestjs/common'
import { CreateBookmarkDto } from './dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}
    getBookmarks() {}

    getBookmarksById() {}

    async createBookmark(dto: CreateBookmarkDto, userId: number) {
        try {
            const bookmark = await this.prisma.bookmark.create({
                data: {
                    userId,
                    ...dto,
                },
            })
            console.log(bookmark)

            return bookmark
        } catch (e) {
            console.log(e)
            return e
        }
    }

    editBookmarksById() {}

    deleteBookmarksById() {}
}
