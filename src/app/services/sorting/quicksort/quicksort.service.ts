import { Injectable } from '@angular/core';
import { QuickSortState } from './QuickSortState';
import { QuickSortNode } from './QuickSortNode';
import { SelectorService } from '../../selector/selector.service';
import { Constant } from '../Constant';

// 2,6,5,3,8,7,1,0
@Injectable()
export class QuicksortService {

  constructor(private selector: SelectorService) {
  }

  frontEndArray = [];
  nodes = [];
  states = [];


  run(array) {
    this.frontEndArray = array;
    this.nodes = this.getQuickSortNodes(array);
    this.quickSort();
    this.presentQuickSortStates();
  }

  private quickSort() {
    const pivot = this.selectPivot();
    this.selectNodePositions(pivot);
    this.orderNodes(pivot);
    this.clearOrderedNodes(pivot);

    if (!this.allSorted()) {
      this.quickSort();
    }
  }

  private clearOrderedNodes(pivot: QuickSortNode) {
    this.nodes = this.organizePositions(this.nodes, pivot, true);
    this.createState();
  }

  private orderNodes(pivot: QuickSortNode) {
    this.nodes = this.organizePositions(this.nodes, pivot, false);
    this.createState();
  }

  private selectNodePositions(pivot: QuickSortNode) {
    this.selectPositions(this.nodes, pivot);
    this.createState();
  }

  private selectPivot() {
    const pivot = this.setPivot();
    this.createState();
    return pivot;
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
          node.position = Constant.LESS;
        } else {
          node.position = Constant.GREATER;
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
          node.position = Constant.LESS;
          less.push(node);
        } else {
          node.position = Constant.GREATER;
          greater.push(node);
        }
        if (clean) {
          node.position = Constant.NONE;
        }
      }
    }

    const newArray = [];
    this.fillArray(newArray, less);
    this.fillPivot(pivot, newArray);
    this.fillArray(newArray, greater);
    return newArray;
  }

  private fillPivot(pivot: QuickSortNode, newArray: any[]) {
    pivot.sorted = true;
    pivot.isPivot = false;
    newArray.push(pivot);
  }

  private fillArray(arrayToFill: QuickSortNode[], oldArray: QuickSortNode[]) {
    for (const node of oldArray) {
      arrayToFill.push(node);
    }
  }

  private allSorted() {
    for (const node of this.nodes) {
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
          this.selector.selectNode(this.frontEndArray[i], '');
        }

        for (let i = 0; i < nodes.length; i++) {
          const nodeToSelect = this.frontEndArray[i];
          if (nodes[i].isPivot) {
            this.selector.selectNode(nodeToSelect, Constant.PIVOT_CLASS);
          } else if (nodes[i].position == Constant.LESS) {
            this.selector.selectNode(nodeToSelect, Constant.LESS_CLASS);
          } else if (nodes[i].position == Constant.GREATER) {
            this.selector.selectNode(nodeToSelect, Constant.GREATER_CLASS);
          } else if (nodes[i].sorted == true) {
            this.selector.selectNode(nodeToSelect, Constant.SORTED_CLASS);
          }
        }

        this.presentQuickSortStates();
      }
    }, 3000);
  }

}
