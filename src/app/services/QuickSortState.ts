export class QuickSortState {
  id: number;
  pivot: string;
  pivotIndex: number;
  position: number;
  value: string;
  array: any;
  less: any;
  greater: any;


  constructor(
    id: number,
    pivot: string,
    pivotIndex: number,
    position: number,
    value: string,
    array: any,
    less: any,
    greater: any


  ) {
    this.id = id;
    this.pivot = pivot;
    this.pivotIndex = pivotIndex;
    this.position = position;
    this.value = value;
    this.array = array;
    this.less = less;
    this.greater = greater;
  }
}
