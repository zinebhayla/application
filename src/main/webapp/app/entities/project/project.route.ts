import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectUpdateComponent } from './project-update.component';
import { IProject } from 'app/shared/model/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectResolve implements Resolve<IProject> {
  constructor(private service: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProject> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((project: HttpResponse<Project>) => project.body));
    }
    return of(new Project());
  }
}

export const projectRoute: Routes = [
  {
    path: '',
    component: ProjectComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProjectDetailComponent,
    resolve: {
      project: ProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProjectUpdateComponent,
    resolve: {
      project: ProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProjectUpdateComponent,
    resolve: {
      project: ProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Projects'
    },
    canActivate: [UserRouteAccessService]
  }
];
