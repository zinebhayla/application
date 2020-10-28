import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedia } from 'app/shared/model/media.model';
import { MediaService } from './media.service';
import { MediaDeleteDialogComponent } from './media-delete-dialog.component';

@Component({
  selector: 'jhi-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit, OnDestroy {
  media: IMedia[];
  eventSubscriber: Subscription;

  constructor(
    protected mediaService: MediaService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.mediaService.query().subscribe((res: HttpResponse<IMedia[]>) => {
      this.media = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInMedia();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMedia) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInMedia() {
    this.eventSubscriber = this.eventManager.subscribe('mediaListModification', () => this.loadAll());
  }

  delete(media: IMedia) {
    const modalRef = this.modalService.open(MediaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.media = media;
  }
}
