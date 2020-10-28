import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
  templateUrl: './exercise-delete-dialog.component.html'
})
export class ExerciseDeleteDialogComponent {
  exercise: IExercise;

  constructor(protected exerciseService: ExerciseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.exerciseService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'exerciseListModification',
        content: 'Deleted an exercise'
      });
      this.activeModal.dismiss(true);
    });
  }
}
