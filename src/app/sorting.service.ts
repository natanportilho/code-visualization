import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {
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
        var rightValue = array[rightPointer]
        array[leftpointer] = rightValue;
        array[rightPointer] = leftvalue;
        return array;
    }

    bubbleSort(array) {
        var swaps = false;
    
        for (var i = 0; i < array.length - 1; i++) {
            if (array[i].value > array[i + 1].value) {
                array = this.swap(array, i, i + 1);
                swaps = true;
            }
        }
    
        if (swaps) return this.bubbleSort(array);
        return array;
    }

    swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }

}