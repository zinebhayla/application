import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IChapter, Chapter } from 'app/shared/model/chapter.model';
import { ChapterService } from './chapter.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
  selector: 'jhi-chapter-update',
  templateUrl: './chapter-update.component.html'
})
export class ChapterUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];

  editForm = this.fb.group({
    id: [],
    name: [],
    date: [],
    state: [],
    course: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected chapterService: ChapterService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chapter }) => {
      this.updateForm(chapter);
    });
    this.courseService
      .query()
      .subscribe((res: HttpResponse<ICourse[]>) => (this.courses = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(chapter: IChapter) {
    this.editForm.patchValue({
      id: chapter.id,
      name: chapter.name,
      date: chapter.date != null ? chapter.date.format(DATE_TIME_FORMAT) : null,
      state: chapter.state,
      course: chapter.course
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chapter = this.createFromForm();
    if (chapter.id !== undefined) {
      this.subscribeToSaveResponse(this.chapterService.update(chapter));
    } else {
      this.subscribeToSaveResponse(this.chapterService.create(chapter));
    }
  }

  private createFromForm(): IChapter {
    return {
      ...new Chapter(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      state: this.editForm.get(['state']).value,
      course: this.editForm.get(['course']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChapter>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCourseById(index: number, item: ICourse) {
    return item.id;
  }
}
