import { CreateBookDto } from "../../dtos";
import { BookEntity } from "../../entities/book.entity";
import { BookRepository } from "../../repositories/book.repository";


export interface CreateBookUseCase {
  execute: (createBookDto: CreateBookDto) => Promise<BookEntity>
}

export class CreateBook implements CreateBookUseCase {
  constructor(
    private readonly repository: BookRepository
  ) { }

  async execute(createBookDto: CreateBookDto): Promise<BookEntity> {
    return await this.repository.create(createBookDto);
  }
}

