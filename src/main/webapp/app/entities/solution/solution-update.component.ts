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
import { ISolution, Solution } from 'app/shared/model/solution.model';
import { SolutionService } from './solution.service';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise/exercise.service';

@Component({
  selector: 'jhi-solution-update',
  templateUrl: './solution-update.component.html'
})
export class SolutionUpdateComponent implements OnInit {
  isSaving: boolean;

  exercises: IExercise[];

  editForm = this.fb.group({
    id: [],
    title: [],
    date: [],
    state: [],
    file: [],
    fileContentType: [],
    content: [],
    donwload: [],
    exercise: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected solutionService: SolutionService,
    protected exerciseService: ExerciseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ solution }) => {
      this.updateForm(solution);
    });
    this.exerciseService.query({ filter: 'solution-is-null' }).subscribe(
      (res: HttpResponse<IExercise[]>) => {
        if (!this.editForm.get('exercise').value || !this.editForm.get('exercise').value.id) {
          this.exercises = res.body;
        } else {
          this.exerciseService
            .find(this.editForm.get('exercise').value.id)
            .subscribe(
              (subRes: HttpResponse<IExercise>) => (this.exercises = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(solution: ISolution) {
    this.editForm.patchValue({
      id: solution.id,
      title: solution.title,
      date: solution.date != null ? solution.date.format(DATE_TIME_FORMAT) : null,
      state: solution.state,
      file: solution.file,
      fileContentType: solution.fileContentType,
      content: solution.content,
      donwload: solution.donwload,
      exercise: solution.exercise
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
    const solution = this.createFromForm();
    if (solution.id !== undefined) {
      this.subscribeToSaveResponse(this.solutionService.update(solution));
    } else {
      this.subscribeToSaveResponse(this.solutionService.create(solution));
    }
  }

  private createFromForm(): ISolution {
    return {
      ...new Solution(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      state: this.editForm.get(['state']).value,
      fileContentType: this.editForm.get(['fileContentType']).value,
      file: this.editForm.get(['file']).value,
      content: this.editForm.get(['content']).value,
      donwload: this.editForm.get(['donwload']).value,
      exercise: this.editForm.get(['exercise']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISolution>>) {
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

  trackExerciseById(index: number, item: IExercise) {
    return item.id;
  }
}
