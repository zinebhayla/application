import { IProject } from 'app/shared/model/project.model';

export interface ITag {
  id?: number;
  name?: string;
  projects?: IProject[];
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public projects?: IProject[]) {}
}
