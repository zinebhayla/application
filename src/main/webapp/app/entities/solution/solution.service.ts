import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISolution } from 'app/shared/model/solution.model';

type EntityResponseType = HttpResponse<ISolution>;
type EntityArrayResponseType = HttpResponse<ISolution[]>;

@Injectable({ providedIn: 'root' })
export class SolutionService {
  public resourceUrl = SERVER_API_URL + 'api/solutions';

  constructor(protected http: HttpClient) {}

  create(solution: ISolution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solution);
    return this.http
      .post<ISolution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(solution: ISolution): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(solution);
    return this.http
      .put<ISolution>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISolution>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISolution[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(solution: ISolution): ISolution {
    const copy: ISolution = Object.assign({}, solution, {
      date: solution.date != null && solution.date.isValid() ? solution.date.toJSON() : null
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
      res.body.forEach((solution: ISolution) => {
        solution.date = solution.date != null ? moment(solution.date) : null;
      });
    }
    return res;
  }
}
