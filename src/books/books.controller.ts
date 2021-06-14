import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateTypeDto } from './dto/create-type.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post('/addbook')
    addbook(@Body() bookDto: CreateBookDto) {

        return this.booksService.addBook(bookDto)
    }

    @Get('/getbooks')
    getbooks() {
        return this.booksService.getBooks()
    }

    @Post('/editbook/:id')
    editbook(@Param() param, @Body() bookDto: CreateBookDto) {

        return this.booksService.editBook(param, bookDto)
    }

    @Get('/removebook/:id')
    activate(@Param() param) {
        return this.booksService.removeBook(param)
    }

    @Post('/addcategories')
    addcatigories(@Body() categoriesDto: CreateTypeDto) {

        return this.booksService.addCategories(categoriesDto)
    }

    @Post('/addtype')
    addtype(@Body() typeDto: CreateTypeDto) {

        return this.booksService.addType(typeDto)
    }
}
