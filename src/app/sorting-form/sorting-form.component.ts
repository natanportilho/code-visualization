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
    nodes = this.bubbleSort(array, 0, 0);
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

  bubbleSort(array, i, j) {
    if (i == array.length) {
      return;
    }
    this.selectNode(array[j]);
    setTimeout(() => {
      if (i < array.length - 1 && j < array.length - 1) {
        if (array[j].value > array[j + 1].value) {
          this.swap(array, j, j + 1);
        }
      }
      if ((j + 1) < array.length - 1) {
        this.bubbleSort(array, i, j + 1);
      } else if (i < array.length) {
        this.bubbleSort(array, i + 1, 0);
      }
    }, 500);
  }

  swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  selectNode(node) {
    node.selected = "selected";
  }

}
