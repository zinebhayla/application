import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExercise } from 'app/shared/model/exercise.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ExerciseService } from './exercise.service';
import { ExerciseDeleteDialogComponent } from './exercise-delete-dialog.component';

@Component({
  selector: 'jhi-exercise',
  templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit, OnDestroy {
  exercises: IExercise[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected exerciseService: ExerciseService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.exercises = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.exerciseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExercise[]>) => this.paginateExercises(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.exercises = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInExercises();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExercise) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInExercises() {
    this.eventSubscriber = this.eventManager.subscribe('exerciseListModification', () => this.reset());
  }

  delete(exercise: IExercise) {
    const modalRef = this.modalService.open(ExerciseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exercise = exercise;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExercises(data: IExercise[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.exercises.push(data[i]);
    }
  }
}
