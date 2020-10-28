import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solution } from 'app/shared/model/solution.model';
import { SolutionService } from './solution.service';
import { SolutionComponent } from './solution.component';
import { SolutionDetailComponent } from './solution-detail.component';
import { SolutionUpdateComponent } from './solution-update.component';
import { ISolution } from 'app/shared/model/solution.model';

@Injectable({ providedIn: 'root' })
export class SolutionResolve implements Resolve<ISolution> {
  constructor(private service: SolutionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISolution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((solution: HttpResponse<Solution>) => solution.body));
    }
    return of(new Solution());
  }
}

export const solutionRoute: Routes = [
  {
    path: '',
    component: SolutionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Solutions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SolutionDetailComponent,
    resolve: {
      solution: SolutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Solutions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SolutionUpdateComponent,
    resolve: {
      solution: SolutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Solutions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SolutionUpdateComponent,
    resolve: {
      solution: SolutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Solutions'
    },
    canActivate: [UserRouteAccessService]
  }
];
