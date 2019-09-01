import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SortingFormComponent } from './sorting-form/sorting-form.component';
import { SortingArrayFormComponent } from './sorting-array-form/sorting-array-form.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            SortingFormComponent,
            SortingArrayFormComponent
        ],
        imports: [
            BrowserModule,
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map