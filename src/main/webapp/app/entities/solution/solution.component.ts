import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISolution } from 'app/shared/model/solution.model';
import { SolutionService } from './solution.service';
import { SolutionDeleteDialogComponent } from './solution-delete-dialog.component';

@Component({
  selector: 'jhi-solution',
  templateUrl: './solution.component.html'
})
export class SolutionComponent implements OnInit, OnDestroy {
  solutions: ISolution[];
  eventSubscriber: Subscription;

  constructor(
    protected solutionService: SolutionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.solutionService.query().subscribe((res: HttpResponse<ISolution[]>) => {
      this.solutions = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSolutions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISolution) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSolutions() {
    this.eventSubscriber = this.eventManager.subscribe('solutionListModification', () => this.loadAll());
  }

  delete(solution: ISolution) {
    const modalRef = this.modalService.open(SolutionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.solution = solution;
  }
}
