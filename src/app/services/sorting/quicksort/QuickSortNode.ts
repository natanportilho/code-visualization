import { BoundElementPropertyAst } from '@angular/compiler';

export class QuickSortNode {
  value: number;
  position: string;
  sorted: boolean;
  isPivot: boolean;

  constructor(value: number) {
    this.value = value;
    this.position = "none";
    this.sorted = false;
    this.isPivot = false;
  }
}
