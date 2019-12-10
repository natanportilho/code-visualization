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
    this.quickSort(array);
    console.table(this.states);

    setTimeout(() => {
      this.pivot.value = this.states[0].pivot;
      array[this.states[0].pivotIndex].value = '';
      this.selectNode(array[this.states[0].id], "selected");
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
        const state = new QuickSortState(
          this.states.length,
          pivot.value,
          pivotIndex,
          i,
          array[i].value,
          array
        );
        this.saveState(state);

        array[i].value > pivot.value
          ? greater.push(array[i])
          : less.push(array[i]);
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
}
