import { Injectable } from '@nestjs/common'
import { CreateBookmarkDto } from './dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}
    async getBookmarks() {
        const bookmarks = await this.prisma.bookmark.findMany()

        return bookmarks
    }

    getBookmarksById() {}

    async createBookmark(dto: CreateBookmarkDto, userId: number) {
        try {
            const bookmark = await this.prisma.bookmark.create({
                data: {
                    userId,
                    ...dto,
                },
            })

            return bookmark
        } catch (e) {
            return e
        }
    }

    editBookmarksById() {}

    deleteBookmarksById() {}
}
