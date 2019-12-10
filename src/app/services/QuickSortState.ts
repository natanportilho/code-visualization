export class QuickSortState {
  id: number;
  pivot: string;
  pivotIndex: number;
  position: number;
  value: string;
  array: any;

  constructor(
    id: number,
    pivot: string,
    pivotIndex: number,
    position: number,
    value: string,
    array: any
  ) {
    this.id = id;
    this.pivot = pivot;
    this.pivotIndex = pivotIndex;
    this.position = position;
    this.value = value;
    this.array = array;
  }
}
