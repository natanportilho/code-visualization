import { Injectable } from '@angular/core';
import { merge } from 'rxjs';

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
          console.log('j = ' + (j + 1) + ' end = ' + end);
          this.selectNode(array[j + 1], "final-position");
          end--;

          if (end <= 1) {
            this.selectNode(array[0], "final-position");
          }
        }
      }
      if ((j + 1) < end) {
        this.bubbleSort(array, end, i, j + 1);
      } else if (i < array.length) {
        this.bubbleSort(array, end, i + 1, 0);
      }
    }, 2000);
  }

  swap(array, i, j) {
    console.log('swapping ' + array[i].value + ' > ' + array[j].value);
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
      let half = Math.floor(array.length / 2)
      let leftHalf = array.slice(0, half);
      let rightHalf = array.slice(half, array.length);
      leftHalf = this.mergeSort(leftHalf, 0, leftHalf.length - 1)
      rightHalf = this.mergeSort(rightHalf, 0, rightHalf.length - 1);
      array = this.merge(leftHalf, rightHalf);
    }
    return array;
  }

  merge(lefthalf, rightHalf){
    let i =  0;
    let j = 0;

    var newArray = [];

    while (i < lefthalf.length && j < rightHalf.length){
      if (Number(lefthalf[i].value) <= Number(rightHalf[j].value)){
        newArray.push(lefthalf[i]);
        i++;
      }else{
        newArray.push(rightHalf[j]);
        j++;
      }
    }

    while(i < lefthalf.length){
      newArray.push(lefthalf[i]);
      i++;
    }

    while(j < rightHalf.length){
      newArray.push(rightHalf[j]);
      j++;
    }
    this.printArray(newArray);
    return newArray;
  }

  printArray(array){
    for (let i = 0; i < array.length; i++){
      console.log(array[i].value);
    }
  }

  quickSort(array){
    let i = 0;
    let j = array.length - 1;
    var pivot =  {
      id: i,
      value: array[0].value,
      colour: 'rgb(135, 206, 235)',
      selected: ""
    };

    let oldPivotPosition = 0;

    array[0].value = "x";
    while (i != j){
      console.log(pivot);
      if (Number(array[j].value) < Number(pivot.value)){
        array[oldPivotPosition].value = array[j].value;
        array[j].value = "x";
      }
      
    }



  }
}
