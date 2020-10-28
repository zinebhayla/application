import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { CategoryDeleteDialogComponent } from './category-delete-dialog.component';

@Component({
  selector: 'jhi-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: ICategory[];
  eventSubscriber: Subscription;

  constructor(
    protected categoryService: CategoryService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => {
      this.categories = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategory) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInCategories() {
    this.eventSubscriber = this.eventManager.subscribe('categoryListModification', () => this.loadAll());
  }

  delete(category: ICategory) {
    const modalRef = this.modalService.open(CategoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.category = category;
  }
}
