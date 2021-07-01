import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateBookResponse } from './dto/createBookResponse.dto';
import { CreateCategResponse } from './dto/createCategResponse.dto';
import { CreateTypeResponse } from './dto/createTypeResponse.dto';
import { RemoveBookDto } from './dto/remove-book.dto';
import { Books } from './models/books.model';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @UsePipes(new ValidationPipe)
    @Post('/addbook')
    addbook(@Body() bookDto: CreateBookDto): Promise<CreateBookResponse> {

        return this.booksService.addBook(bookDto)
    }

    @Get('/getbooks')
    getbooks(): Promise<Books[]> {
        return this.booksService.getBooks()
    }

    @UsePipes(new ValidationPipe)
    @Post('/editbook/:id')
    editbook(@Param() param, @Body() bookDto: CreateBookDto): Promise<string> {

        return this.booksService.editBook(param, bookDto)
    }

    @UsePipes(new ValidationPipe)
    @Get('/removebook/:id')
    removebook(@Param() param: RemoveBookDto): Promise<string> {
        return this.booksService.removeBook(param)
    }

    @UsePipes(new ValidationPipe)
    @Post('/addcategories')
    addcatigories(@Body() categoriesDto: CreateTypeDto): Promise<CreateCategResponse> {

        return this.booksService.addCategories(categoriesDto)
    }

    @UsePipes(new ValidationPipe)
    @Post('/addtype')
    addtype(@Body() typeDto: CreateTypeDto): Promise<CreateTypeResponse> {

        return this.booksService.addType(typeDto)
    }
}
