import { QuickSortNode } from "./QuickSortNode";

export class QuickSortState {
  nodes: QuickSortNode[];

  constructor(nodes: QuickSortNode[]) {
    this.nodes = nodes;
  }
}
