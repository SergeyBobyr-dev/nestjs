import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { Books } from './models/books.model';
import { Categories } from './models/categoties.model';
import { Type } from './models/type.model';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Books) private bookRepository,
        @InjectModel(Categories) private categoriesRepository,
        @InjectModel(Type) private typeRepository) { }

    async addBook(dto: CreateBookDto) {

        const { name, author, description, year_of_production, price, category_id, rate, user_id, type_id } = dto;

        const newBook = await this.bookRepository.create({
            name, author, description, year_of_production, price, category_id, rate, user_id, type_id
        })

        return newBook

    }

    async getBooks() {
        const books = this.bookRepository.findAll()
        return books
    }

    async editBook(param, dto: CreateBookDto) {

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
    }

    async removeBook(param) {

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
    }

    async addCategories(dto: CreateTypeDto) {

        const newCategory = await this.categoriesRepository.create({
            name: dto.name
        })
        return newCategory
    }

    async addType(dto: CreateTypeDto) {

        const newType = await this.typeRepository.create({
            name: dto.name
        })
        return newType
    }
}
