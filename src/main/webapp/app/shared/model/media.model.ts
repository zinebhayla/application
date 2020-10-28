import { IProject } from 'app/shared/model/project.model';

export interface IMedia {
  id?: number;
  urlContentType?: string;
  url?: any;
  project?: IProject;
}

export class Media implements IMedia {
  constructor(public id?: number, public urlContentType?: string, public url?: any, public project?: IProject) {}
}
