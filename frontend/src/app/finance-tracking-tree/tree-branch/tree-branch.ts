import { Component, Input } from '@angular/core';

@Component({
  selector: 'tree-branch',
  templateUrl: 'tree-branch.html',
  styleUrls: ['tree-branch.scss'],
})
export class TreeBranchComponent {
  @Input() node!: any;
  @Input() hasDownArrow: boolean = false;
  @Input() isLeafNode: boolean = false;
  @Input() isFirstLevelNode: boolean = true;

  constructor() {}

  ngOnInit() {}
}
