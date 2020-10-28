import { Moment } from 'moment';
import { IChapter } from 'app/shared/model/chapter.model';
import { Level } from 'app/shared/model/enumerations/level.model';

export interface IExercise {
  id?: number;
  title?: string;
  content?: any;
  date?: Moment;
  state?: number;
  level?: Level;
  visit?: number;
  chapter?: IChapter;
}

export class Exercise implements IExercise {
  constructor(
    public id?: number,
    public title?: string,
    public content?: any,
    public date?: Moment,
    public state?: number,
    public level?: Level,
    public visit?: number,
    public chapter?: IChapter
  ) {}
}
