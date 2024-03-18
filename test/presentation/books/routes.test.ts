import request from 'supertest';
import { prisma } from '../../../src/data/postgres';
import { testServer } from '../../../src/test-server';



describe('book route testing', () => {

  beforeAll(async () => {
    await testServer.start();
  });

  beforeEach( async () => {
    await prisma.book.deleteMany();
    await prisma.requestLog.deleteMany();
  } );

  const book1 = { title: 'Hola Mundo 1', author: 'author 1', description: 'description 1' };
  const book2 = { title: 'Hola Mundo 2', author: 'author 2', description: 'description 2' };


  test('should return BOOKs api/books ', async () => {


    const { body } = await request(testServer.app)
      .get('/api/books')
      .expect(200);

    expect(body).toBeInstanceOf(Array);

  });



  test('should return a Book api/books/:id', async () => {

    const book = await prisma.book.create({ data: book1 });

    const { body } = await request(testServer.app)
      .get(`/api/books/${book.id}`)
      .expect(200);

    expect(body).toEqual({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description
    });

  });


  test('should return a 404 NotFound api/books/:id', async () => {

    const bookId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/books/${bookId}`)
      .expect(404);

    expect(body).toEqual({ error: `Book with id ${bookId} not found` });

  });

  test('should return a 400 badRequest api/books/:id', async () => {

    const bookId = '999asd';
    const { body } = await request(testServer.app)
      .get(`/api/books/${bookId}`)
      .expect(400);

    expect(body).toEqual({ error: `Invalid id` });

  });


  test('should return a new book api/books', async () => {

    const { body } = await request(testServer.app)
      .post('/api/books')
      .send(book1)
      .expect(201);


    expect(body).toEqual({
      id: expect.any(Number),
      title: book1.title,
      author: book1.author,
      description: book1.description
    });

  });

  test('should return an error if Title is present api/books', async () => {

    const { body } = await request(testServer.app)
      .post('/api/books')
      .send({
        author: 'author 1',
        description: 'description 1'
      })
      .expect(400);

    console.log(body);


    expect(body).toEqual({ error: 'Title is required' });

  });

  test('should return an error if author is empty api/books', async () => {

    const { body } = await request(testServer.app)
      .post('/api/books')
      .send({
        title: 'Hola Mundo 1',
        description: 'description 1'
      })
      .expect(400);

    expect(body).toEqual({ error: 'Author is required' });

  });

  test('should return an error if description is empty api/books', async () => {

    const { body } = await request(testServer.app)
      .post('/api/books')
      .send({
        title: 'Hola Mundo 1',
        author: 'author 1'
      })
      .expect(400);

    expect(body).toEqual({ error: 'Description is required' });

  });



  test('should return an updated BOOKS api/books/:id', async () => {

    const book = await prisma.book.create({ data: book1 });


    const { body } = await request(testServer.app)
      .put(`/api/books/${book.id}`)
      .send({ title: 'Hola mundo UPDATE', author: 'book1.author', description: 'book1.description' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      title: 'Hola mundo UPDATE',
      author: 'book1.author',
      description: 'book1.description'
    });

  });



  test('should return 404 if book not found', async () => {

    const { body } = await request(testServer.app)
      .put(`/api/books/999`)
      .send({ title: 'Hola mundo UPDATE 2', author: 'book1.author 2', description: 'book1.description 2' })
      .expect(404);

    expect(body).toEqual({ error: 'Book with id 999 not found' });

  });

  test('should return 400 if id book is not a number', async () => {

    const { body } = await request(testServer.app)
      .put(`/api/books/9992dad`)
      .send({ title: 'Hola mundo UPDATE 2', author: 'book1.author 2', description: 'book1.description 2' })
      .expect(400);

    expect(body).toEqual({ error: 'Invalid id' });

  });


  test('should return an updated book only the date', async () => {

    const book = await prisma.book.create({ data: book1 });

    const { body } = await request(testServer.app)
      .put(`/api/books/${book.id}`)
      .send({ description: 'new descr' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      title: book1.title,
      author: book1.author,
      description: 'new descr'
    });

  });



  test('should delete a book api/books/:id', async () => {

    const book = await prisma.book.create({ data: book1 });

    const { body } = await request(testServer.app)
      .delete(`/api/books/${book.id}`)
      .expect(200);

    console.log('======>', body);


    expect(body).toEqual({
      id: book.id,
      title: book1.title,
      author: book1.author,
      description: book1.description
    });

  });


  test('should return 404 if book do not exist api/books/:id', async () => {


    const { body } = await request(testServer.app)
      .delete(`/api/books/999`)
      .expect(404);

    expect(body).toEqual({ error: 'Book with id 999 not found' });

  });

  test('should return 400 if id book is not a number', async () => {


    const { body } = await request(testServer.app)
      .delete(`/api/books/999ccd`)
      .expect(400);

    expect(body).toEqual({ error: 'Invalid id' });

  });


});
