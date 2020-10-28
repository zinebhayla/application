import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TravailTestModule } from '../../../test.module';
import { SolutionUpdateComponent } from 'app/entities/solution/solution-update.component';
import { SolutionService } from 'app/entities/solution/solution.service';
import { Solution } from 'app/shared/model/solution.model';

describe('Component Tests', () => {
  describe('Solution Management Update Component', () => {
    let comp: SolutionUpdateComponent;
    let fixture: ComponentFixture<SolutionUpdateComponent>;
    let service: SolutionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TravailTestModule],
        declarations: [SolutionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SolutionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolutionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolutionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Solution(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Solution();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
