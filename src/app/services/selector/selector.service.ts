import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor() { }

  selectNode(node, cssClass) {
    if (node.selected !== "final-position") {
      node.selected = cssClass;
    }
  }
  
}

