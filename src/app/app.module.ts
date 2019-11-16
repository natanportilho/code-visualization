import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SortingFormComponent } from './components/sorting-form/sorting-form.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
