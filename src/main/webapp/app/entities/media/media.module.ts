import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravailSharedModule } from 'app/shared/shared.module';
import { MediaComponent } from './media.component';
import { MediaDetailComponent } from './media-detail.component';
import { MediaUpdateComponent } from './media-update.component';
import { MediaDeleteDialogComponent } from './media-delete-dialog.component';
import { mediaRoute } from './media.route';

@NgModule({
  imports: [TravailSharedModule, RouterModule.forChild(mediaRoute)],
  declarations: [MediaComponent, MediaDetailComponent, MediaUpdateComponent, MediaDeleteDialogComponent],
  entryComponents: [MediaDeleteDialogComponent]
})
export class TravailMediaModule {}
