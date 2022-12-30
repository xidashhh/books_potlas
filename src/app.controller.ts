import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { BooksDto } from './books.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listBooks() {
    const [rows] = await db.execute(
      'SELECT title, rating FROM books ORDER BY rating DESC',
    );

    return {
      books: rows,
    };
  }

  @Get('')
  @Render('index')
  async listBooksFiltered(@Body() books: BooksDto) {
    const [rows] = await db.execute(
      'SELECT title, rating FROM books WHERE rating = VALUES (?) ORDER BY rating DESC',
      [books.rating],
    );

    return {
      books: rows,
    };
  }

  @Get('books/new')
  @Render('form')
  newBookForm() {
    return {};
  }

  @Post('books/new')
  @Redirect()
  async newKonyv(@Body() books: BooksDto) {
    const []: any = await db.execute(
      'INSERT INTO books (title, rating) VALUES (?, ?)',
      [books.title, books.rating],
    );
    return {
      url: '/',
    };
  }
}

