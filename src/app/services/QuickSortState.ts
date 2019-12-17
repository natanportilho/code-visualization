import { QuickSortNode } from "./QuickSortNode";

export class QuickSortState {
  nodes: QuickSortNode[];
  pivot: QuickSortNode;

  constructor(nodes: QuickSortNode[], pivot: QuickSortNode) {
    this.nodes = nodes;
    this.pivot = pivot;
  }
}
