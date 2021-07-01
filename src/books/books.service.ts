import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateBookResponse } from './dto/createBookResponse.dto';
import { CreateCategResponse } from './dto/createCategResponse.dto';
import { CreateTypeResponse } from './dto/createTypeResponse.dto';
import { RemoveBookDto } from './dto/remove-book.dto';
import { Books } from './models/books.model';
import { Categories } from './models/categoties.model';
import { Type } from './models/type.model';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Books) private bookRepository,
        @InjectModel(Categories) private categoriesRepository,
        @InjectModel(Type) private typeRepository) { }

    async addBook(dto: CreateBookDto): Promise<CreateBookResponse> {
        try {
            const { name, author, description, year_of_production, price, category_id, rate, user_id, type_id } = dto;

            const newBook = await this.bookRepository.create({
                name, author, description, year_of_production, price, category_id, rate, user_id, type_id
            })

            return newBook
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }

    }

    async getBooks(): Promise<Books[]>{
        try {
            const books = this.bookRepository.findAll()
            return books
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }

    }

    async editBook(param, dto: CreateBookDto): Promise<string> {
        try {
            const { name, author, description, year_of_production, price, category_id, rate, user_id, type_id } = dto

            const checkId = await this.bookRepository.findOne({
                where: { id: param.id }
            })

            if (checkId) {
                await this.bookRepository.update(
                    { name, author, description, year_of_production, price, category_id, rate, user_id, type_id },
                    { where: { id: param.id } })
                return "book updated"
            } else {
                throw new HttpException('book not found', HttpStatus.BAD_REQUEST)
            }
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }
    }

    async removeBook(param: RemoveBookDto): Promise<string> {
        try {
            const removedBook = await this.bookRepository.findOne({
                where: { id: param.id }
            })
            if (removedBook) {
                await this.bookRepository.destroy({
                    where: {
                        id: param.id
                    }
                })
                return "book removed"
            } else {
                return "book not found"
            }
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }

    }

    async addCategories(dto: CreateTypeDto): Promise<CreateCategResponse> {
        try {
            const newCategory = await this.categoriesRepository.create({
                name: dto.name
            })
            return newCategory
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }
    }

    async addType(dto: CreateTypeDto): Promise<CreateTypeResponse> {
        try {
            const newType = await this.typeRepository.create({
                name: dto.name
            })
            return newType
        } catch (e) {
            throw new HttpException('Server error', HttpStatus.BAD_REQUEST)
        }
    }
}
