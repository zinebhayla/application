import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChapter } from 'app/shared/model/chapter.model';

type EntityResponseType = HttpResponse<IChapter>;
type EntityArrayResponseType = HttpResponse<IChapter[]>;

@Injectable({ providedIn: 'root' })
export class ChapterService {
  public resourceUrl = SERVER_API_URL + 'api/chapters';

  constructor(protected http: HttpClient) {}

  create(chapter: IChapter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chapter);
    return this.http
      .post<IChapter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chapter: IChapter): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chapter);
    return this.http
      .put<IChapter>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChapter>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChapter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chapter: IChapter): IChapter {
    const copy: IChapter = Object.assign({}, chapter, {
      date: chapter.date != null && chapter.date.isValid() ? chapter.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chapter: IChapter) => {
        chapter.date = chapter.date != null ? moment(chapter.date) : null;
      });
    }
    return res;
  }
}
