import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravailTestModule } from '../../../test.module';
import { SolutionDetailComponent } from 'app/entities/solution/solution-detail.component';
import { Solution } from 'app/shared/model/solution.model';

describe('Component Tests', () => {
  describe('Solution Management Detail Component', () => {
    let comp: SolutionDetailComponent;
    let fixture: ComponentFixture<SolutionDetailComponent>;
    const route = ({ data: of({ solution: new Solution(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TravailTestModule],
        declarations: [SolutionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SolutionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SolutionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.solution).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
