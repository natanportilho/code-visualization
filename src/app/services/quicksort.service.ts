import { Injectable } from "@angular/core";
import { QuickSortState } from "./QuickSortState";

@Injectable()
export class QuicksortService {
  states = [];

  pivot = {
    id: 0,
    value: "x",
    colour: "rgb(135, 206, 235)",
    selected: ""
  };

  alreadySorted = [];

  run(array) {
    const arrayValues = this.getArrayValues(array);

    this.quickSortSimple(arrayValues);
    console.table(this.states);

    this.runQuickSortStates(array, 0);
  }

  runQuickSortStates(array, position) {
    setTimeout(() => {
      console.log('calling');
      const state = this.states[position];
      const less = state.less;
      const greater = state.greater;
      let lastModifiedIndex = 0;

      let j = 0;
      for (let i = 0; i < less.length; i++) {
        while(array[j].selected == 'final-position' && j < array.length){
          j++;
        }
        array[j].value = less[i];
        lastModifiedIndex = j + 1;
        j++;
      }

      array[lastModifiedIndex].value = state.pivot;
      array[lastModifiedIndex].selected = 'final-position';

      
      for (let i = 0; i < greater.length; i++) {
        while(array[j].selected == 'final-position' && j < array.length){
          j++;
        }
        array[j].value = greater[i];
        j++;
      }

      // console.log('positions ' + position + ' < ' + this.);
      if (position < this.states.length) {
        this.runQuickSortStates(array, ++position);
      }
    }, 2000);
  }

  quickSort(array) {
    // if (array.length <= 1) {
    //   return array;
    // }
    // const pivotIndex = 0;
    // const pivot = array[pivotIndex];
    // const less = [];
    // const greater = [];
    // for (let i = 0; i < array.length; i++) {
    //   if (i !== pivotIndex) {
    //     array[i] > pivot ? greater.push(array[i]) : less.push(array[i]);
    //     const state = new QuickSortState(
    //       this.states.length,
    //       pivot,
    //       pivotIndex,
    //       i,
    //       array[i],
    //       array,
    //       less,
    //       greater,
    //       this.getNotComparedElements(array, pivot, less, greater)
    //     );
    //     console.log(
    //       "not compared" +
    //         this.getNotComparedElements(array, pivot, less, greater)
    //     );
    //     this.saveState(state);
    //   }
    // }
    // return [...this.quickSort(less), pivot, ...this.quickSort(greater)];
  }

  saveState(state: QuickSortState) {
    this.states.push(state);
  }

  getArrayValues(array) {
    const arrayValues = [];
    for (const i of array) {
      const value = i.value;
      arrayValues.push(value);
    }
    return arrayValues;
  }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }

  getNotComparedElements(all, pivot, less, greater) {
    let notCompared = [];

    for (let i = 0; i < all.length; i++) {
      if (pivot != i && !less.includes(i) && !greater.includes(i)) {
        notCompared.push(i);
      }
    }
    return notCompared;
  }

  quickSortSimple(array) {
    if (array.length <= 1) {
      return array;
    }
    let pivot = array[0];

    let less = [];
    let greater = [];

    for (let i = 1; i < array.length; i++) {
      if (array[i] <= pivot) {
        less.push(array[i]);
      } else {
        greater.push(array[i]);
      }
    }

    const state = new QuickSortState(pivot, less, greater);
    this.saveState(state);

    this.quickSortSimple(less);
    this.quickSortSimple(greater);
  }
}
