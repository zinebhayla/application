import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';

@Component({
  templateUrl: './chapter-delete-dialog.component.html'
})
export class ChapterDeleteDialogComponent {
  chapter: IChapter;

  constructor(protected chapterService: ChapterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.chapterService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'chapterListModification',
        content: 'Deleted an chapter'
      });
      this.activeModal.dismiss(true);
    });
  }
}
