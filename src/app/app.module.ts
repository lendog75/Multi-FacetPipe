import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FacetFilterPipe } from './pipes/facet-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FacetsComponent } from './facets/facets.component';


@NgModule({
  declarations: [
    AppComponent,
    FacetFilterPipe,
    FacetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
