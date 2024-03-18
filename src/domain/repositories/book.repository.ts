import { BookEntity } from "../entities/book.entity";
import { EditBookDto, CreateBookDto } from "../dtos";


export abstract class BookRepository {

  //* Metodos
  abstract create(createBookDto: CreateBookDto): Promise<BookEntity>;

  abstract getAll(): Promise<BookEntity[]>;
  
  abstract findById(id: number): Promise<BookEntity>;
  
  abstract updateById(createBookDto: EditBookDto): Promise<BookEntity>;

  abstract deleteById(id: number): Promise<BookEntity>;

}


