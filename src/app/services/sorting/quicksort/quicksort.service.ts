import { Injectable } from "@angular/core";
import { QuickSortState } from "./QuickSortState";
import { QuickSortNode } from "./QuickSortNode";

// 2,6,5,3,8,7,1,0
@Injectable()
export class QuicksortService {
  frontEndArray = [];
  nodes = [];
  states = [];
  LESS = 'less';
  GREATER = 'greater';
  NONE = 'none';

  run(array) {
    this.frontEndArray = array;
    this.nodes = this.getQuickSortNodes(array);
    this.quickSort(this.nodes);
    this.presentQuickSortStates();
  }

  private quickSort(nodes: QuickSortNode[]) {

    const pivot = this.setPivot();
    this.createState();

    this.selectPositions(this.nodes, pivot);
    this.createState();

    this.nodes = this.organizePositions(this.nodes, pivot, false);
    this.createState();

    this.nodes = this.organizePositions(this.nodes, pivot, true);
    this.createState();

    if (!this.allSorted(this.nodes)) {
      this.quickSort(this.nodes);
    }
  }

  private createState() {
    let array = this.nodes.map(x => Object.assign({}, x));
    const state = new QuickSortState(array)
    this.saveState(state);
  }

  private saveState(state: QuickSortState) {
    this.states.push(state);
  }

  private getQuickSortNodes(array: any) {
    const nodes = [];
    for (const i of array) {
      const value = i.value;
      nodes.push(new QuickSortNode(value));
    }
    return nodes;
  }

  private setPivot() {
    for (const node of this.nodes) {
      if (!node.sorted) {
        node.isPivot = true;
        return node;
      }
    }
  }

  private selectPositions(nodes: QuickSortNode[], pivot: QuickSortNode) {
    for (const node of nodes) {
      if (node !== pivot) {
        if (node.value <= pivot.value) {
          node.position = this.LESS;
        } else {
          node.position = this.GREATER;
        }
      }
    }
  }

  private organizePositions(nodes: QuickSortNode[], pivot: QuickSortNode, clean: boolean) {
    let less = [];
    let greater = [];

    for (const node of nodes) {
      if (node !== pivot) {
        if (node.value <= pivot.value) {
          node.position = this.LESS;
          if (clean) {
            node.position = this.NONE;
          }
          less.push(node);
        } else {
          node.position = this.GREATER;
          if (clean) {
            node.position = this.NONE;
          }
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
          this.selectNode(this.frontEndArray[i], "");
        }

        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].isPivot) {
            this.selectNode(this.frontEndArray[i], "pivot-element");
          } else if (nodes[i].position == this.LESS) {
            this.selectNode(this.frontEndArray[i], "less-element");
          } else if (nodes[i].position == this.GREATER) {
            this.selectNode(this.frontEndArray[i], "greater-element");
          } else if (nodes[i].sorted == true) {
            this.selectNode(this.frontEndArray[i], "final-position");
          }
        }

        this.presentQuickSortStates();
      }
    }, 3000);
  }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }

}
