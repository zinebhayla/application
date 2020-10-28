import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ChapterDeleteDialogComponent } from './chapter-delete-dialog.component';

@Component({
  selector: 'jhi-chapter',
  templateUrl: './chapter.component.html'
})
export class ChapterComponent implements OnInit, OnDestroy {
  chapters: IChapter[];
  eventSubscriber: Subscription;

  constructor(protected chapterService: ChapterService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.chapterService.query().subscribe((res: HttpResponse<IChapter[]>) => {
      this.chapters = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInChapters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChapter) {
    return item.id;
  }

  registerChangeInChapters() {
    this.eventSubscriber = this.eventManager.subscribe('chapterListModification', () => this.loadAll());
  }

  delete(chapter: IChapter) {
    const modalRef = this.modalService.open(ChapterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chapter = chapter;
  }
}
