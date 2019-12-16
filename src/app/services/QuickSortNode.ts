export class QuickSortNode {
  value: number;
  position: string;
  sorted: boolean;

  constructor(value: number) {
    this.value = value;
    this.position = "none";
    this.sorted = false;
  }
}
