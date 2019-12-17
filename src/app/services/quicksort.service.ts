import { Injectable } from "@angular/core";
import { QuickSortState } from "./QuickSortState";
import { QuickSortNode } from "./QuickSortNode";

// 2,6,5,3,8,7,1,0
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
    this.quickSort(this.nodes);
  }

  quickSort(nodes: QuickSortNode[]) {
    const pivot = this.setPivot(nodes);
    this.selectPositions(this.nodes, pivot);
    console.table(this.nodes);
    this.nodes = this.organizePositions(this.nodes, pivot);
    console.table(this.nodes);

    if (!this.allSorted(this.nodes)) {
      this.quickSort(this.nodes);
    }
  }

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

  private setPivot(nodes: QuickSortNode[]) {
    for (const node of nodes) {
      if (!node.sorted) {
        node.isPivot = true; // remember to set to false later on, otherwise everyone will be pivot
        return node;
      }
    }
  }

  private selectPositions(nodes: QuickSortNode[], pivot: QuickSortNode) {
    for (const node of nodes) {
      if (node !== pivot) {
        if (node.value <= pivot.value) {
          node.position = "less";
        } else {
          node.position = "greater";
        }
      }
    }
  }

  private organizePositions(nodes: QuickSortNode[], pivot: QuickSortNode) {
    let less = [];
    let greater = [];

    for (const node of nodes) {
      if (node !== pivot) {
        if (node.value <= pivot.value) {
          less.push(node);
        } else {
          greater.push(node);
        }
      }
    }

    const newArray = [];

    for (const node of less) {
      newArray.push(node);
    }

    pivot.sorted = true;
    pivot.isPivot = false;
    newArray.push(pivot);

    for (const node of greater) {
      newArray.push(node);
    }

    return newArray;
  }

  private allSorted(nodes: QuickSortNode[]) {
    for (let node of nodes) {
      if (!node.sorted) {
        return false;
      }
    }
    return true;
  }
}
