

export class CreateBookDto {
  

  private constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly description: string
  ){}

  static create( props:{[key:string]:any} ): [string?, CreateBookDto?]  {

    const { title, author, description } = props;

    if (!title) return ['Title is required', undefined];
    if (!author) return ['Author is required', undefined];
    if (!description) return ['Description is required', undefined];
    
    
    return [undefined, new CreateBookDto(title, author, description)];


  }

}



