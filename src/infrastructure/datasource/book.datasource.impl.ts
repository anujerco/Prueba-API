import { prisma } from '../../data/postgres';
import { BookDataSource, BookEntity, CreateBookDto, EditBookDto } from '../../domain';




export class BookDataSourceImpl implements BookDataSource {

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    const newBook = await prisma.book.create({
      data: createBookDto!
    })
    return BookEntity.fromObject(newBook);
  }

  async getAll(): Promise<BookEntity[]> {
    const books = await prisma.book.findMany()
    return books.map(book => BookEntity.fromObject(book));
  }

  async findById(id: number): Promise<BookEntity> {
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id)
      }
    })
    if ( !book ) throw `Book with id ${ id } not found`;
    return BookEntity.fromObject(book);
  }

  async updateById(EditBookDto: EditBookDto): Promise<BookEntity> {
    await this.findById(EditBookDto.id);

    const updateBook = await prisma.book.update({
      where: {
        id: EditBookDto.id
      },
      data: EditBookDto!.values
    })
    return BookEntity.fromObject(updateBook);
  }

  async deleteById(id: number): Promise<BookEntity> {
    await this.findById(id);
    const bookDeleted = await prisma.book.delete({
      where: {
        id: Number(id)
      }
    })
    return BookEntity.fromObject(bookDeleted);
  }

}