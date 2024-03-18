import { BookEntity } from "../../entities/book.entity";
import { BookRepository } from "../../repositories/book.repository";


//* Interfaz para el caso de uso
export interface GetBooksUseCase {
  execute: () => Promise<BookEntity[]>
}

//* Implementacion del caso de uso
export class GetBooks implements GetBooksUseCase {
  constructor(
    private readonly repository: BookRepository
  ) { }

  async execute(): Promise<BookEntity[]> {
    return await this.repository.getAll();
  }
}

