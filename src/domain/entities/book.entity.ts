

export class BookEntity {

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly description: string
  ){}

  get summary(){
    const text = `Libro escrito por ${this.author} con el título ${this.title}`;
    return text; 
  }

  public static fromObject( props: {[key:string]:any} ): BookEntity {
    const { id, title, author, description } = props;

    if (!id) throw new Error('Invalid id');
    if (!title) throw new Error('Title is required');
    if (!author) throw new Error('Author is required');
    if (!description) throw new Error('Description is required');

    return new BookEntity(id, title, author, description);
  }


}


