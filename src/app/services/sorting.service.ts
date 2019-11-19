import { Injectable } from "@angular/core";
import { merge } from "rxjs";

@Injectable()
export class SortingService {
  pivot = {
    id: 0,
    value: "x",
    colour: "rgb(135, 206, 235)",
    selected: ""
  };

  bubbleSort(array, end, i, j) {
    if (i == array.length) {
      return;
    }

    this.selectNode(array[j], "selected");

    setTimeout(() => {
      if (Number(array[j].value) > Number(array[j + 1].value)) {
        this.selectNode(array[j + 1], "selected-for-comparison");
      }
    }, 500);

    setTimeout(() => {
      if (i < array.length - 1 && j < end) {
        if (Number(array[j].value) > Number(array[j + 1].value)) {
          this.swap(array, j, j + 1);
        }
        array[j].selected = "";
        array[j + 1].selected = "";

        if (j + 1 == end) {
          console.log("j = " + (j + 1) + " end = " + end);
          this.selectNode(array[j + 1], "final-position");
          end--;

          if (end <= 1) {
            this.selectNode(array[0], "final-position");
          }
        }
      }
      if (j + 1 < end) {
        this.bubbleSort(array, end, i, j + 1);
      } else if (i < array.length) {
        this.bubbleSort(array, end, i + 1, 0);
      }
    }, 2000);
  }

  swap(array, i, j) {
    console.log("swapping " + array[i].value + " > " + array[j].value);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }

  mergeSort(array, leftIndex, rightIndex) {
    if (leftIndex < rightIndex) {
      let half = Math.floor(array.length / 2);
      let leftHalf = array.slice(0, half);
      let rightHalf = array.slice(half, array.length);
      leftHalf = this.mergeSort(leftHalf, 0, leftHalf.length - 1);
      rightHalf = this.mergeSort(rightHalf, 0, rightHalf.length - 1);
      array = this.merge(leftHalf, rightHalf);
    }
    return array;
  }

  merge(lefthalf, rightHalf) {
    let i = 0;
    let j = 0;

    var newArray = [];

    while (i < lefthalf.length && j < rightHalf.length) {
      if (Number(lefthalf[i].value) <= Number(rightHalf[j].value)) {
        newArray.push(lefthalf[i]);
        i++;
      } else {
        newArray.push(rightHalf[j]);
        j++;
      }
    }

    while (i < lefthalf.length) {
      newArray.push(lefthalf[i]);
      i++;
    }

    while (j < rightHalf.length) {
      newArray.push(rightHalf[j]);
      j++;
    }
    this.printArray(newArray);
    return newArray;
  }

  printArray(array) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i].value);
    }
  }

  quickSort(array, i, j) {
    let lastIndex = j;
    let emptySpot = 0;

    this.selectNode(array[i], "selected");
    this.selectNode(this.pivot, "selected");
    this.pivot.value = array[0].value; // is this correct? Getting always 0 index as pivot?

    array[i].arrow = "show-arrow";
    array[j].arrow = "show-arrow";

    setTimeout(() => {
      // come from right

      array[emptySpot].value = ".";
      this.selectNode(array[emptySpot], "selected-red");
      setTimeout(() => {
        this.selectNode(array[j], "selected");

        setTimeout(() => {
          this.looptThroughFromRight(array, i, j, emptySpot);

          /// come from left now
          setTimeout(() => {
            // this.quickSortFromLeft(array, i, j, emptySpot);
            this.looptThroughFromLeft(array, i, j, emptySpot);
          }, 1000);
          // now should find a way to call ir recursively
        }, 1000);
      }, 1000);
    }, 1000);

    this.quickSort(array, i, j);
  }

  looptThroughFromLeft(array, i, j, emptySpot) {
    setTimeout(() => {
      if (
        Number(array[i + 1].value) <= Number(this.pivot.value) &&
        i + 1 != j
      ) {
        array[i].arrow = "hide-arrow";
        array[i + 1].arrow = "show-arrow";
        i++;
        this.looptThroughFromLeft(array, i, j, emptySpot);
      } else {
        this.quickSortFromLeft(array, i, j, emptySpot);
      }
    }, 1000);
  }

  looptThroughFromRight(array, i, j, emptySpot) {
    setTimeout(() => {
      if (Number(array[j].value) >= Number(this.pivot.value) && i != j) {
        array[j].arrow = "hide-arrow";
        array[i - 1].arrow = "show-arrow";
        j--;
        this.looptThroughFromLeft(array, i, j, emptySpot);
      } else {
        this.quickSortFromRight(array, i, j, emptySpot);
      }
    }, 1000);
  }

  quickSortFromLeft(array, i, j, emptySpot) {
    if (Number(array[i + 1].value) > Number(this.pivot.value)) {
      array[emptySpot].value = array[i + 1].value;
      this.selectNode(array[emptySpot], "");
      array[i + 1].value = ".";
      emptySpot = i + 1;
    } else if (this.quickSortFlagsMeet(i + 1, j)) {
      array[i].arrow = "hide-arrow";
      array[j].arrow = "hide-arrow";
      this.quickSortPlacePivotInFinalPosition(array, j);
    }
  }

  quickSortFromRight(array, i, j, emptySpot) {
    if (Number(array[j].value) < Number(this.pivot.value)) {
      array[emptySpot].value = array[j].value;
      this.selectNode(array[emptySpot], "");
      array[j].value = ".";
      emptySpot = j;
    } else if (this.quickSortFlagsMeet(i, j)) {
      array[i].arrow = "hide-arrow";
      array[j].arrow = "hide-arrow";
      this.quickSortPlacePivotInFinalPosition(array, j);
    }
  }

  quickSortPlacePivotInFinalPosition(array, spot) {
    array[spot].value = this.pivot.value;
    this.selectNode(array[spot], "final-position");
    this.pivot.value = "";
  }

  quickSortFlagsMeet(i, j) {
    return i == j && this.pivot.value != "";
  }
}
