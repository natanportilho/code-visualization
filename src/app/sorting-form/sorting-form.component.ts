import { Component, OnInit, ɵEMPTY_ARRAY } from '@angular/core';
import { SortingService } from '../sorting.service';

@Component({
  selector: 'sorting-form',
  templateUrl: './sorting-form.component.html',
  styleUrls: ['./sorting-form.component.css'],
  providers: [SortingService]
})
export class SortingFormComponent implements OnInit {
  nodes = [];

  constructor(private sortingService: SortingService) {

  }

  ngOnInit() {
  }

  callBubbleSort(nodes) {
    const array = nodes;
    nodes = this.bubbleSortDraw(array, 0, 0);
  }

  createArray() {
    this.nodes = [];
    var array = (<HTMLInputElement>document.getElementById("inputArray")).value.split(",");

    for (var i = 0; i < array.length; i++) {
      var node = {
        id: i,
        value: array[i],
        colour: 'rgb(135, 206, 235)',
        selected: ""
      };
      this.nodes.push(node);
    }
  }

  bubbleSortRecursion(array) {
    var swaps = false;

    for (var i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        this.swap(array, i, i + 1);
        swaps = true;
      }
    }

    if (swaps) return this.bubbleSort(array);
    return array;
  }

  selectNodes(node) {
    node.selected = "selected;";
  }

  deselectAll(){
    var lights = document.getElementsByClassName("selected");
    while (lights.length)
      lights[0].className = lights[0].className.replace(/\bselected\b/g, "");
  }

  swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  bubbleSort(array) {
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = 0; j < array.length - 1; j++) {
        if (array[j].value > array[j + 1].value) {
          this.swap(array, j, j + 1);
        }
      }
    }
  }

  bubbleSortDraw(array, i, j) {
    console.log('j is' + j + ' and j value is ' + array[j].value );

    array[j].selected = "selected";
      setTimeout(() => {
        if (i < array.length - 1 && j < array.length - 1) {
          if (array[j].value > array[j + 1].value) {
            this.swap(array, j, j + 1);
          }
        }
        if ((j + 1) == array.length - 1 && i < array.length - 1) {
          this.bubbleSortDraw(array, i + 1, 0);
        } else {
          this.bubbleSortDraw(array, j, j + 1);
        }
      }, 500);
  }
}

