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
  pivot: any;

  constructor(private sortingService: SortingService) {
    this.pivot = sortingService.pivot;
  }

  ngOnInit() {
  }

  callBubbleSort(nodes) {
    const array = nodes;
    let algorithm = (<HTMLInputElement>document.getElementById("algorithm-selection")).value;
    if (algorithm == "Bubble Sort") {
      this.sortingService.bubbleSort(array, array.length - 1, 0, 0);
    } else if (algorithm == "Quick Sort") {
      this.sortingService.quickSort(array);
    }
  }

  createArray() {
    this.nodes = [];
    var array = (<HTMLInputElement>document.getElementById("inputArray")).value.split(",");

    if (array.length <= 1) {
      window.alert('Please create an array with at least two numbers :)');
    } else {
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

  algorithmSelection(algorithm){
    var algorithmSelection = (<HTMLInputElement>document.getElementById("algorithm-selection"));
    var algorithm = algorithmSelection.options[algorithmSelection.selectedIndex].value;
    var label = (<HTMLInputElement>document.getElementsByClassName("pivot-element")[0]);
    var pivot = (<HTMLInputElement>document.getElementsByClassName("pivot-element")[1]);

    if (algorithm == 'Quick Sort'){
      label.style.visibility = 'visible';
      pivot.style.visibility = 'visible';
    }else{
      label.style.visibility = 'hidden';
      pivot.style.visibility = 'hidden';
    }
  }
}
