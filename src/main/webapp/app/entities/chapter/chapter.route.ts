import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ChapterComponent } from './chapter.component';
import { ChapterDetailComponent } from './chapter-detail.component';
import { ChapterUpdateComponent } from './chapter-update.component';
import { IChapter } from 'app/shared/model/chapter.model';

@Injectable({ providedIn: 'root' })
export class ChapterResolve implements Resolve<IChapter> {
  constructor(private service: ChapterService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChapter> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((chapter: HttpResponse<Chapter>) => chapter.body));
    }
    return of(new Chapter());
  }
}

export const chapterRoute: Routes = [
  {
    path: '',
    component: ChapterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Chapters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChapterDetailComponent,
    resolve: {
      chapter: ChapterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Chapters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChapterUpdateComponent,
    resolve: {
      chapter: ChapterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Chapters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChapterUpdateComponent,
    resolve: {
      chapter: ChapterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Chapters'
    },
    canActivate: [UserRouteAccessService]
  }
];
