import { Component, OnInit, ɵEMPTY_ARRAY } from '@angular/core';
import { SortingService } from '../../services/sorting.service';
import { QuicksortService } from '../../services/quicksort.service';

@Component({
  selector: 'sorting-form',
  templateUrl: './sorting-form.component.html',
  styleUrls: ['./sorting-form.component.css'],
  providers: [SortingService, QuicksortService]
})
export class SortingFormComponent implements OnInit {
  nodes = [];

  pivot: any;
  isPivotVisible: boolean = false;

  data = {
    model: null,
    availableOptions: [
      { id: '1', name: 'Bubble Sort' },
      { id: '2', name: 'Quick Sort' }
    ]
  };

  constructor(private sortingService: SortingService, private quickSortService: QuicksortService) {

  }

  ngOnInit() {
  }

  callBubbleSort(nodes) {
    const array = nodes;
    let algorithm = (<HTMLInputElement>document.getElementById("algorithm-selection")).value;
    if (algorithm == "1") {
      this.sortingService.bubbleSort(array, array.length - 1, 0, 0);
    } else if (algorithm == "2") {
      let sortedArray = this.quickSortService.run(array);
    }
  }

  createArray() {
    this.nodes = [];
    var array = (<HTMLInputElement>document.getElementById("inputArray")).value.split(",");

    if (array.length <= 1) {
      window.alert('Please create an array with at least two numbers :)');
    } else if (array.length > 12){
      window.alert('Please create an array with less than twelve numbers :)');
    } else {
      for (var i = 0; i < array.length; i++) {
        var node = {
          id: i,
          value: array[i],
          colour: 'rgb(135, 206, 235)',
          selected: "",
          arrow: "hide-arrow"
        };
        this.nodes.push(node);
      }
    }
  }

  getSelectedAlgorithm(event: Event) {
    let algorithm = event.target['options']
    [event.target['options'].selectedIndex].text;
    if (algorithm == 'Quick Sort') {
      this.isPivotVisible = true;
    } else {
      this.isPivotVisible = false;
    }
  }
}
