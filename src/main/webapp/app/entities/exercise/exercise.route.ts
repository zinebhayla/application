import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';
import { ExerciseComponent } from './exercise.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { ExerciseUpdateComponent } from './exercise-update.component';
import { IExercise } from 'app/shared/model/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseResolve implements Resolve<IExercise> {
  constructor(private service: ExerciseService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExercise> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((exercise: HttpResponse<Exercise>) => exercise.body));
    }
    return of(new Exercise());
  }
}

export const exerciseRoute: Routes = [
  {
    path: '',
    component: ExerciseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exercises'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExerciseDetailComponent,
    resolve: {
      exercise: ExerciseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exercises'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExerciseUpdateComponent,
    resolve: {
      exercise: ExerciseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exercises'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExerciseUpdateComponent,
    resolve: {
      exercise: ExerciseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exercises'
    },
    canActivate: [UserRouteAccessService]
  }
];
