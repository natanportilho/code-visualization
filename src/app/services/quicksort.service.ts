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

  run(array) {
    const arrayValues = this.getArrayValues(array);

    this.quickSort(arrayValues);
    console.table(this.states);

    this.runQuickSortStates(array, arrayValues, 0);
  }

  runQuickSortStates(array, arrayValues, position) {

    setTimeout(() => {
      console.log(this.states);
      console.log("position" + position);
      console.log("pivot changing to " + this.states[position].pivot);


      setTimeout(() => {
        const state = this.states[position];
        const currentArray = state.array;

        for (let i = 0; i < currentArray.length; i++) {
          array[i].value = arrayValues[i];
        }

        if (position < this.states.length) {
          position = position + 1;
          this.runQuickSortStates(
            array,
            this.states[position].array,
            position
          );
        }
      }, 4000);
    }, 4000);
  }

  quickSort(array) {
    if (array.length <= 1) {
      return array;
    }

    const pivotIndex = 0;
    const pivot = array[pivotIndex];

    const less = [];
    const greater = [];

    for (let i = 0; i < array.length; i++) {
      if (i !== pivotIndex) {
        array[i] > pivot ? greater.push(array[i]) : less.push(array[i]);

        const state = new QuickSortState(
          this.states.length,
          pivot,
          pivotIndex,
          i,
          array[i],
          array,
          less,
          greater,
          this.getNotComparedElements(array, pivot, less, greater)
        );

          
        console.log('not compared' + this.getNotComparedElements(array, pivot, less, greater));

        this.saveState(state);
      }
    }

    return [...this.quickSort(less), pivot, ...this.quickSort(greater)];
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
}
