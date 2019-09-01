import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SortingService } from '../sorting.service';
let SortingFormComponent = class SortingFormComponent {
    constructor(sortingService) {
        this.sortingService = sortingService;
    }
    ngOnInit() {
    }
    callBubbleSort() {
        var array = document.getElementById("inputArray").value;
        var result = this.sortingService.bubleSort(array);
        window.alert(result);
    }
};
SortingFormComponent = tslib_1.__decorate([
    Component({
        selector: 'sorting-form',
        templateUrl: './sorting-form.component.html',
        styleUrls: ['./sorting-form.component.css'],
        providers: [SortingService]
    })
], SortingFormComponent);
export { SortingFormComponent };
//# sourceMappingURL=sorting-form.component.js.map