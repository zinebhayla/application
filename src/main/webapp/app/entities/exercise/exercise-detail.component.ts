import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExercise } from 'app/shared/model/exercise.model';

@Component({
  selector: 'jhi-exercise-detail',
  templateUrl: './exercise-detail.component.html'
})
export class ExerciseDetailComponent implements OnInit {
  exercise: IExercise;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ exercise }) => {
      this.exercise = exercise;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
