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

  run(array, lessArray, greaterArray) {
    const arrayValues = this.getArrayValues(array);

    this.quickSort(arrayValues);
    console.table(this.states);

    this.runQuickSortStates(array, arrayValues, 0, lessArray, greaterArray);
  }

  runQuickSortStates(array, arrayValues, position, lessArray, greaterArray) {
    // console.log('lolo');
    setTimeout(() => {
      console.log(this.states);
      console.log("position" + position);
      console.log("pivot changing to " + this.states[position].pivot);

      this.pivot.value = this.states[position].pivot;
      array[this.states[position].pivotIndex].value = "";

      setTimeout(() => {
        for (let i = 0; i < arrayValues.length; i++) {
          array[i].value = arrayValues[i];
        }

        for (const node of array) {
          this.selectNode(node, "");
        }

        let less = this.states[position].less;
        let greater = this.states[position].greater;

        for (const node of lessArray) {
          node.value = "";
        }

        for (let i = 0; i < less.length; i++) {
          lessArray[i].value = less[i];
        }

        this.selectNode(array[this.states[position].position], "selected");

        if (position < this.states.length) {
          position = position + 1;
          this.runQuickSortStates(
            array,
            this.states[position].array,
            position,
            lessArray,
            greaterArray
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
          greater
        );
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
}
