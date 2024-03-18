import { EditBookDto } from "../../dtos";
import { BookEntity } from "../../entities/book.entity";
import { BookRepository } from "../../repositories/book.repository";


export interface UpdateBookUseCase {
  execute: (editBookDto: EditBookDto) => Promise<BookEntity>
}

export class UpdateBook implements UpdateBookUseCase {
  constructor(
    private readonly repository: BookRepository
  ) { }

  async execute(editBookDto: EditBookDto): Promise<BookEntity> {
    return await this.repository.updateById(editBookDto);
  }
}

