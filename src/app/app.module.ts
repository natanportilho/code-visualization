import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SortingFormComponent } from './sorting-form/sorting-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingFormComponent
  ],
  imports: [
    BrowserModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
