import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class QuicksortService {

  // var node = {
  //   id: i,
  //   value: array[i],
  //   colour: 'rgb(135, 206, 235)',
  //   selected: "",
  //   arrow: "hide-arrow"
  // };

  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.quickSort(items, index, right);
      }
    }
    return items;
  }

  partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i].value < pivot.value) {
        i++;
      }
      while (items[j].value > pivot.value) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
}
