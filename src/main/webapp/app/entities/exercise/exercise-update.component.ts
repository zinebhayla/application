import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IExercise, Exercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';
import { IChapter } from 'app/shared/model/chapter.model';
import { ChapterService } from 'app/entities/chapter/chapter.service';

@Component({
  selector: 'jhi-exercise-update',
  templateUrl: './exercise-update.component.html'
})
export class ExerciseUpdateComponent implements OnInit {
  isSaving: boolean;

  chapters: IChapter[];

  editForm = this.fb.group({
    id: [],
    title: [],
    content: [],
    date: [],
    state: [],
    level: [],
    visit: [],
    chapter: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected exerciseService: ExerciseService,
    protected chapterService: ChapterService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ exercise }) => {
      this.updateForm(exercise);
    });
    this.chapterService
      .query()
      .subscribe((res: HttpResponse<IChapter[]>) => (this.chapters = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(exercise: IExercise) {
    this.editForm.patchValue({
      id: exercise.id,
      title: exercise.title,
      content: exercise.content,
      date: exercise.date != null ? exercise.date.format(DATE_TIME_FORMAT) : null,
      state: exercise.state,
      level: exercise.level,
      visit: exercise.visit,
      chapter: exercise.chapter
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const exercise = this.createFromForm();
    if (exercise.id !== undefined) {
      this.subscribeToSaveResponse(this.exerciseService.update(exercise));
    } else {
      this.subscribeToSaveResponse(this.exerciseService.create(exercise));
    }
  }

  private createFromForm(): IExercise {
    return {
      ...new Exercise(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      content: this.editForm.get(['content']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      state: this.editForm.get(['state']).value,
      level: this.editForm.get(['level']).value,
      visit: this.editForm.get(['visit']).value,
      chapter: this.editForm.get(['chapter']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercise>>) {
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

  trackChapterById(index: number, item: IChapter) {
    return item.id;
  }
}
