import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TravailSharedModule } from 'app/shared/shared.module';
import { TravailCoreModule } from 'app/core/core.module';
import { TravailAppRoutingModule } from './app-routing.module';
import { TravailHomeModule } from './home/home.module';
import { TravailEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TravailSharedModule,
    TravailCoreModule,
    TravailHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TravailEntityModule,
    TravailAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class TravailAppModule {}
