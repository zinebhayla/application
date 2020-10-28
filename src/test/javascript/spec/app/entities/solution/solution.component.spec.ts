import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravailTestModule } from '../../../test.module';
import { SolutionComponent } from 'app/entities/solution/solution.component';
import { SolutionService } from 'app/entities/solution/solution.service';
import { Solution } from 'app/shared/model/solution.model';

describe('Component Tests', () => {
  describe('Solution Management Component', () => {
    let comp: SolutionComponent;
    let fixture: ComponentFixture<SolutionComponent>;
    let service: SolutionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TravailTestModule],
        declarations: [SolutionComponent],
        providers: []
      })
        .overrideTemplate(SolutionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SolutionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SolutionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Solution(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.solutions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
