import { BookEntity } from "../../entities/book.entity";
import { BookRepository } from "../../repositories/book.repository";


export interface DeleteBookUseCase {
  execute: (id:number) => Promise<BookEntity>
}

export class DeleteBook implements DeleteBookUseCase {
  constructor(
    private readonly repository: BookRepository
  ) { }

  async execute(id:number): Promise<BookEntity> {
    return await this.repository.deleteById(id);
  }
}

