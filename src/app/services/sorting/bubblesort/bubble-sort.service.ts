import { Injectable } from '@angular/core';
import { SelectorService } from '../../selector/selector.service';
import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor(private selector: SelectorService) {
  }

  run(array, end, i, j) {
    if (i == array.length) {
      return;
    }

    this.selector.selectNode(array[j], Constant.SELECTED);

    setTimeout(() => {
      if (Number(array[j].value) > Number(array[j + 1].value)) {
        this.selector.selectNode(array[j + 1], Constant.SELECTED_COMPARISON);
      }
    }, 500);

    setTimeout(() => {
      if (i < array.length - 1 && j < end) {
        if (Number(array[j].value) > Number(array[j + 1].value)) {
          this.swap(array, j, j + 1);
        }
        array[j].selected = '';
        array[j + 1].selected = '';

        if (j + 1 == end) {
          this.selector.selectNode(array[j + 1], Constant.SORTED_CLASS);
          end--;
          if (end <= 1) {
            this.selector.selectNode(array[0], Constant.SORTED_CLASS);
          }
        }
      }
      if (j + 1 < end) {
        this.run(array, end, i, j + 1);
      } else if (i < array.length) {
        this.run(array, end, i + 1, 0);
      }
    }, 2000);
  }

  swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

}
