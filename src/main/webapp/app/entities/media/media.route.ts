import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Media } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { MediaComponent } from './media.component';
import { MediaDetailComponent } from './media-detail.component';
import { MediaUpdateComponent } from './media-update.component';
import { IMedia } from 'app/shared/model/media.model';

@Injectable({ providedIn: 'root' })
export class MediaResolve implements Resolve<IMedia> {
  constructor(private service: MediaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMedia> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((media: HttpResponse<Media>) => media.body));
    }
    return of(new Media());
  }
}

export const mediaRoute: Routes = [
  {
    path: '',
    component: MediaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Media'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MediaDetailComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Media'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MediaUpdateComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Media'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MediaUpdateComponent,
    resolve: {
      media: MediaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Media'
    },
    canActivate: [UserRouteAccessService]
  }
];
