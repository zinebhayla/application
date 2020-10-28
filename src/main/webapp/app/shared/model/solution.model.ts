import { Moment } from 'moment';
import { IExercise } from 'app/shared/model/exercise.model';

export interface ISolution {
  id?: number;
  title?: string;
  date?: Moment;
  state?: number;
  fileContentType?: string;
  file?: any;
  content?: any;
  donwload?: number;
  exercise?: IExercise;
}

export class Solution implements ISolution {
  constructor(
    public id?: number,
    public title?: string,
    public date?: Moment,
    public state?: number,
    public fileContentType?: string,
    public file?: any,
    public content?: any,
    public donwload?: number,
    public exercise?: IExercise
  ) {}
}
