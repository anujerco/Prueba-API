

export class EditBookDto {
  

  private constructor(
    public readonly id: number,
    public readonly title?: string,
    public readonly author?: string,
    public readonly description?: string
  ){}

  get values() {
    const returnObject: {[key:string]:any} = {};
    if (this.title) returnObject.title = this.title;
    if (this.author) returnObject.author = this.author;
    if (this.description) returnObject.description = this.description;
    return returnObject;
  }

  static create( props:{[key:string]:any} ): [string?, EditBookDto?]  {

    const { id, title, author, description } = props;

    if (isNaN(Number(id))) return ['Invalid id', undefined];
    if (title && title.length > 50) return [ 'The maximum number of characters for the title is 50' , undefined];
    if (author && author.length > 50) return ['The maximum number of characters for the author is 50', undefined];
    if (description && description.length > 255 ) return ['The maximum number of characters for the description is 255', undefined];
    
    
    return [undefined, new EditBookDto(Number(id), title, author, description)];

  }

}



