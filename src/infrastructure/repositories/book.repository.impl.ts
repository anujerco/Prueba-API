import { BookDataSource, BookEntity, BookRepository, CreateBookDto, EditBookDto } from "../../domain";


export class BookRepositoryImpl implements BookRepository {

  constructor(
    private readonly datasource: BookDataSource
  ){}

  create(createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.datasource.create(createBookDto);
  }

  getAll(): Promise<BookEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<BookEntity> {
    return this.datasource.findById(id);
  }

  updateById(editBookDto: EditBookDto): Promise<BookEntity> {
    return this.datasource.updateById(editBookDto);
  }

  deleteById(id: number): Promise<BookEntity> {
    return this.datasource.deleteById(id);
  }

}

