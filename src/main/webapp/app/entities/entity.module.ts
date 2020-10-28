import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'exercise',
        loadChildren: () => import('./exercise/exercise.module').then(m => m.TravailExerciseModule)
      },
      {
        path: 'solution',
        loadChildren: () => import('./solution/solution.module').then(m => m.TravailSolutionModule)
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.TravailCourseModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.TravailCategoryModule)
      },
      {
        path: 'chapter',
        loadChildren: () => import('./chapter/chapter.module').then(m => m.TravailChapterModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.TravailProjectModule)
      },
      {
        path: 'tag',
        loadChildren: () => import('./tag/tag.module').then(m => m.TravailTagModule)
      },
      {
        path: 'media',
        loadChildren: () => import('./media/media.module').then(m => m.TravailMediaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TravailEntityModule {}
