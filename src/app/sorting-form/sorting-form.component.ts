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
    nodes = this.bubbleSort(array, array.length - 1, 0, 0);
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

  bubbleSort(array, end, i, j) {
    if (i == array.length) {
      return;
    }
    this.selectNode(array[j]);
    setTimeout(() => {
      if (i < array.length - 1 && j < end) {
        if (Number(array[j].value) > Number(array[j + 1].value)) {
          this.swap(array, j, j + 1);
          if (j + 1 == end) {
            end = end - 1;
          }
        }
      }
      if ((j + 1) < end) {
        this.bubbleSort(array, end, i, j + 1);
      } else if (i < array.length) {
        this.bubbleSort(array, end, i + 1, 0);
      }
    }, 400);
  }

  swap(array, i, j) {
    console.log('swapping ' + array[i].value + ' > ' + array[j].value);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  selectNode(node) {
    node.selected = "selected";
  }
}
