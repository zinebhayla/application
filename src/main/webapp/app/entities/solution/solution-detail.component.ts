import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISolution } from 'app/shared/model/solution.model';

@Component({
  selector: 'jhi-solution-detail',
  templateUrl: './solution-detail.component.html'
})
export class SolutionDetailComponent implements OnInit {
  solution: ISolution;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ solution }) => {
      this.solution = solution;
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
