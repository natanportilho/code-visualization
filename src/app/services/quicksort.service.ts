import { Injectable } from "@angular/core";
import { QuickSortState } from "./QuickSortState";
import { QuickSortNode } from "./QuickSortNode";

@Injectable()
export class QuicksortService {
  nodes = [];
  states = [];

  pivot = {
    id: 0,
    value: "x",
    colour: "rgb(135, 206, 235)",
    selected: ""
  };

  run(array) {
    this.nodes = this.getQuickSortNodes(array);
    console.table(this.nodes);
  }

  quickSort(array) {}

  saveState(state: QuickSortState) {
    this.states.push(state);
  }

  getArrayValues(array) {
    const arrayValues = [];
    for (const i of array) {
      const value = i.value;
      arrayValues.push(value);
    }
    return arrayValues;
  }

  private getQuickSortNodes(array: any) {
    const nodes = [];
    for (const i of array) {
      const value = i.value;
      nodes.push(new QuickSortNode(value));
    }
    return nodes;
  }
}
