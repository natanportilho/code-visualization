import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let SortingService = class SortingService {
    quickSort(array) {
        if (array.length <= 1) {
            return array;
        }
        var leftPointer = 0;
        var rightPointer = array.length - 1;
        var half = Math.round((array.length - 1) / 2);
        var pivot = array[half];
        while (leftPointer < rightPointer) {
            while (array[leftPointer] < pivot) {
                leftPointer++;
            }
            while (array[rightPointer] > pivot) {
                rightPointer--;
            }
            if (array[leftPointer] != array[rightPointer]) {
                array = this.swipe(array, leftPointer, rightPointer);
            }
        }
        var leftHalf = array.slice(0, leftPointer);
        var rightHalf = array.slice(rightPointer, array.length);
        return this.quickSort(leftHalf).concat(this.quickSort(rightHalf));
    }
    swipe(array, leftpointer, rightPointer) {
        var leftvalue = array[leftpointer];
        var rightValue = array[rightPointer];
        array[leftpointer] = rightValue;
        array[rightPointer] = leftvalue;
        return array;
    }
};
SortingService = tslib_1.__decorate([
    Injectable()
], SortingService);
export { SortingService };
//# sourceMappingURL=sorting.service.js.map