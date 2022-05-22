import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { BookmarkService } from './bookmark.service'
import { GetUser } from '../auth/decorator'
import { CreateBookmarkDto } from './dto'

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    async getBookmarks(@GetUser('id') userId: number) {
        return await this.bookmarkService.getBookmarks()
    }

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {}

    @Post()
    async createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto
    ) {
        return await this.bookmarkService.createBookmark(dto, userId)
    }

    @Patch()
    editBookmarksById(@GetUser('id') userId: number) {}

    @Delete()
    deleteBookmarksById(@GetUser('id') userId: number) {}
}
