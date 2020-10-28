import { IChapter } from 'app/shared/model/chapter.model';
import { ICategory } from 'app/shared/model/category.model';

export interface ICourse {
  id?: number;
  name?: string;
  imgContentType?: string;
  img?: any;
  chapters?: IChapter[];
  category?: ICategory;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public name?: string,
    public imgContentType?: string,
    public img?: any,
    public chapters?: IChapter[],
    public category?: ICategory
  ) {}
}
