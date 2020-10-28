import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISolution } from 'app/shared/model/solution.model';
import { SolutionService } from './solution.service';

@Component({
  templateUrl: './solution-delete-dialog.component.html'
})
export class SolutionDeleteDialogComponent {
  solution: ISolution;

  constructor(protected solutionService: SolutionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.solutionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'solutionListModification',
        content: 'Deleted an solution'
      });
      this.activeModal.dismiss(true);
    });
  }
}
