import { Component, OnInit, ɵEMPTY_ARRAY } from '@angular/core';
import { SortingService } from '../sorting.service';
import { $ } from 'protractor';

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
    let algorithm = (<HTMLInputElement>document.getElementById("algorithm-selection")).value;
    if (algorithm == "Bubble Sort") {
      this.sortingService.bubbleSort(array, array.length - 1, 0, 0);
    } else if (algorithm == "Merge Sort") {
      this.sortingService.mergeSort(array, 0, array.length - 1);
    }
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
}
