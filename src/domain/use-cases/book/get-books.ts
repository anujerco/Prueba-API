import { BookEntity } from "../../entities/book.entity";
import { BookRepository } from "../../repositories/book.repository";


export interface GetBooksUseCase {
  execute: () => Promise<BookEntity[]>
}

export class GetBooks implements GetBooksUseCase {
  constructor(
    private readonly repository: BookRepository
  ) { }

  async execute(): Promise<BookEntity[]> {
    return await this.repository.getAll();
  }
}

