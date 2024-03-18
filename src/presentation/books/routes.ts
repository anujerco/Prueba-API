import { Router } from 'express';
import { BooksController } from './controller';
import { BookDataSourceImpl } from '../../infrastructure/datasource/book.datasource.impl';
import { BookRepositoryImpl } from '../../infrastructure/repositories/book.repository.impl';



export class BookRoutes {


  static get routes(): Router {
    
    const router = Router();
    const datasource = new BookDataSourceImpl();
    const repository = new BookRepositoryImpl( datasource );
    const booksController = new BooksController( repository );


    router.get('/', booksController.getBooks );
    router.get('/:id', booksController.getBookById );
    router.post('/', booksController.createBook );
    router.put('/:id', booksController.updateBook );
    router.delete('/:id', booksController.deleteBook );

    return router;
  }


}




