import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SortingFormComponent } from './components/sorting-form/sorting-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SortingFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
