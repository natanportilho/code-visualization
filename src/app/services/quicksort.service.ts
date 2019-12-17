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
    this.showStates();
    // console.table(this.states);
    // console.log(this.frontEndArray);
  }

  private quickSort(nodes: QuickSortNode[]) {
    const pivot = this.setPivot(nodes);

    let array1 = this.nodes.map(x => Object.assign({}, x));


    const state1 = new QuickSortState(array1)
    this.saveState(state1);
    // console.table(pivot);
    this.selectPositions(this.nodes, pivot);
    let array2 = this.nodes.map(x => Object.assign({}, x));
    const state2 = new QuickSortState(array2)
    this.saveState(state2);
    // console.table(this.nodes);
    this.nodes = this.organizePositions(this.nodes, pivot);
    let array3 = this.nodes.map(x => Object.assign({}, x));
    const state3 = new QuickSortState(array3)
    this.saveState(state3);
    // console.table(this.nodes);

    if (!this.allSorted(this.nodes)) {
      this.quickSort(this.nodes);
    }
  }

  private saveState(state: QuickSortState) {
    console.log('saving this state');
    console.table(state);

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
          node.position = 'none';
          less.push(node);
        } else {
          node.position = 'none';
          greater.push(node);
        }
      }
    }

    const newArray = [];

    for (const node of less) {
      newArray.push(node);
    }

    // console.log("this is pivot " + pivot.value);
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
    }, 2000);
  }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }

  private showStates(){
    console.log('show states');
    for (let state of this.states){
      console.table(state);
    }
  }
}
