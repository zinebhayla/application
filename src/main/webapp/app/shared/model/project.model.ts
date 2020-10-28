import { Moment } from 'moment';
import { ITag } from 'app/shared/model/tag.model';
import { Level } from 'app/shared/model/enumerations/level.model';

export interface IProject {
  id?: number;
  title?: string;
  descriptionContentType?: string;
  description?: any;
  date?: Moment;
  level?: Level;
  visit?: number;
  tags?: ITag[];
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public title?: string,
    public descriptionContentType?: string,
    public description?: any,
    public date?: Moment,
    public level?: Level,
    public visit?: number,
    public tags?: ITag[]
  ) {}
}
