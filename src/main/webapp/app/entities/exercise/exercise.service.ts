import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExercise } from 'app/shared/model/exercise.model';

type EntityResponseType = HttpResponse<IExercise>;
type EntityArrayResponseType = HttpResponse<IExercise[]>;

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  public resourceUrl = SERVER_API_URL + 'api/exercises';

  constructor(protected http: HttpClient) {}

  create(exercise: IExercise): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exercise);
    return this.http
      .post<IExercise>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(exercise: IExercise): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exercise);
    return this.http
      .put<IExercise>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExercise>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExercise[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(exercise: IExercise): IExercise {
    const copy: IExercise = Object.assign({}, exercise, {
      date: exercise.date != null && exercise.date.isValid() ? exercise.date.toJSON() : null
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
      res.body.forEach((exercise: IExercise) => {
        exercise.date = exercise.date != null ? moment(exercise.date) : null;
      });
    }
    return res;
  }
}
