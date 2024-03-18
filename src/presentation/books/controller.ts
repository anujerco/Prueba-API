import { Request, Response } from 'express';
import { CreateBookDto, EditBookDto } from '../../domain/dtos';
import { BookRepository, CreateBook, DeleteBook, GetBooks, UpdateBook } from '../../domain';
import { GetBook } from '../../domain/use-cases/book/get-book';


export class BooksController {

  //*DI
  constructor(
    private readonly bookRepository: BookRepository
  ) { }


  //* Funcion para obtener todos los libros
  public getBooks = (req: Request, res: Response) => {
    new GetBooks(this.bookRepository)
      .execute()
      .then(books => res.json(books))
      .catch(error => res.status(400).json({ error }));
  }

  
  //* Funcion para obtener un libro por id
  public getBookById = (req: Request, res: Response) => {

    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    new GetBook(this.bookRepository)
      .execute(Number(id))
      .then(book => res.json(book))
      .catch(error => res.status(404).json({ error }));
  }


  //* Funcion para crear un libro
  public createBook = (req: Request, res: Response) => {

    const [error, createBookDto] = CreateBookDto.create(req.body);
    if (error) return res.status(400).json({ error: error });
    
    new CreateBook(this.bookRepository)
      .execute(createBookDto!)
      .then(book => res.status(201).json(book))
      .catch(error => res.status(400).json({ error }));
  }


  //* Funcion para actualizar un libro
  public updateBook = (req: Request, res: Response) => {

    const { id } = req.params;
    const [error, editBookDto] = EditBookDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error: error });
    
    new UpdateBook(this.bookRepository)
      .execute(editBookDto!)
      .then(book => res.json(book))
      .catch(error => res.status(404).json({ error }));
  }


  //* Funcion para eliminar un libro
  public deleteBook = (req: Request, res: Response) => {

    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    new DeleteBook(this.bookRepository)
      .execute(Number(id))
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  }


}



