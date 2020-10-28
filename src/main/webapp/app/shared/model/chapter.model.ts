import { Moment } from 'moment';
import { ICourse } from 'app/shared/model/course.model';

export interface IChapter {
  id?: number;
  name?: string;
  date?: Moment;
  state?: number;
  course?: ICourse;
}

export class Chapter implements IChapter {
  constructor(public id?: number, public name?: string, public date?: Moment, public state?: number, public course?: ICourse) {}
}
