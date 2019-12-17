import { Injectable } from "@angular/core";
import { QuickSortState } from "./QuickSortState";
import { QuickSortNode } from "./QuickSortNode";

// 2,6,5,3,8,7,1,0
@Injectable()
export class QuicksortService {
  frontEndArray = [];
  nodes = [];
  states = [];

  pivot = {
    id: 0,
    value: "x",
    colour: "rgb(135, 206, 235)",
    selected: ""
  };

  run(array) {
    // console.log(array);
    this.frontEndArray = array;
    this.nodes = this.getQuickSortNodes(array);
    this.quickSort(this.nodes);
    this.presentQuickSortStates();
    // console.table(this.states);
    // console.log(this.frontEndArray);
  }

  private quickSort(nodes: QuickSortNode[]) {
    const pivot = this.setPivot(nodes);
    console.table(pivot);
    this.selectPositions(this.nodes, pivot);
    this.saveState(new QuickSortState(this.nodes, pivot));
    // console.table(this.nodes);
    this.nodes = this.organizePositions(this.nodes, pivot);
    this.saveState(new QuickSortState(this.nodes, pivot));
    // console.table(this.nodes);

    // if (!this.allSorted(this.nodes)) {
    //   this.quickSort(this.nodes);
    // }
  }

  private saveState(state: QuickSortState) {
    this.states.push(state);
  }

  private getArrayValues(array) {
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
    for (const node of this.nodes) {
      if (!node.sorted) {
        node.isPivot = true;
        return node;
      }
    }

    // for (const i = 0; i < this.nodes.length; i++) {
    //   if (!this.nodes[i].sorted) {
    //     this.nodes[i].isPivot = true;
    //     return this.nodes[i];
    //   }
    // }
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

    console.log("this is pivot " + pivot.value);
    pivot.sorted = true;
    pivot.isPivot = false;
    newArray.push(pivot);

    for (const node of greater) {
      newArray.push(node);
    }

    return newArray;
  }

  private allSorted(nodes: QuickSortNode[]) {
    for (const node of nodes) {
      if (!node.sorted) {
        return false;
      }
    }
    return true;
  }

  private presentQuickSortStates() {
    setTimeout(() => {
      if (this.states.length > 0) {
        const state = this.states.shift();
        const nodes = state.nodes;

        for (let i = 0; i < nodes.length; i++) {
          this.frontEndArray[i].value = nodes[i].value;
        }

        console.table(this.states[0]);

        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].isPivot) {
            this.selectNode(this.frontEndArray[i], "pivot-element");
          } else if (nodes[i].position == "less") {
            this.selectNode(this.frontEndArray[i], "less-element");
          } else if (nodes[i].position == "greater") {
            this.selectNode(this.frontEndArray[i], "greater-element");
          } else if (nodes[i].sorted == true) {
            this.selectNode(this.frontEndArray[i], "final-position");
          }
        }

        this.presentQuickSortStates();
      }
    }, 5000);
  }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }
}
