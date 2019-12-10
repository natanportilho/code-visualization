import { Injectable } from '@angular/core';

@Injectable()
export class QuicksortService {
  pivot = {
    id: 0,
    value: 'x',
    colour: 'rgb(135, 206, 235)',
    selected: ''
  };



  // TODOS: Saves the states of the array - less and greater and of the pivot
  quickSort(array) {
    if (array.length <= 1) {
      return array;
    }

    const pivotIndex = 0;
    this.pivot = array[pivotIndex];

    const less = [];
    const greater = [];

    for (let i = 0; i < array.length; i++) {
      if (i !== pivotIndex) {
        array[i].value > this.pivot.value ? greater.push(array[i]) : less.push(array[i]);
      }
    }

    return [...this.quickSort(less), this.pivot, ...this.quickSort(greater)];
  }

}
