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
    this.sortingService.bubbleSort(array, array.length - 1, 0, 0);
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
