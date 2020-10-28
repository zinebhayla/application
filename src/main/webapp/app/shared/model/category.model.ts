export interface ICategory {
  id?: number;
  name?: string;
  imgContentType?: string;
  img?: any;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public imgContentType?: string, public img?: any) {}
}
