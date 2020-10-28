import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravailSharedModule } from 'app/shared/shared.module';
import { ExerciseComponent } from './exercise.component';
import { ExerciseDetailComponent } from './exercise-detail.component';
import { ExerciseUpdateComponent } from './exercise-update.component';
import { ExerciseDeleteDialogComponent } from './exercise-delete-dialog.component';
import { exerciseRoute } from './exercise.route';

@NgModule({
  imports: [TravailSharedModule, RouterModule.forChild(exerciseRoute)],
  declarations: [ExerciseComponent, ExerciseDetailComponent, ExerciseUpdateComponent, ExerciseDeleteDialogComponent],
  entryComponents: [ExerciseDeleteDialogComponent]
})
export class TravailExerciseModule {}
