import { Injectable } from "@angular/core";

@Injectable()
export class SortingService {

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
}
