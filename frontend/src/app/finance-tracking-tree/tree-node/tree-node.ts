import { Component, Input } from '@angular/core';

@Component({
  selector: 'tree-node',
  templateUrl: 'tree-node.html',
  styleUrls: ['tree-node.scss'],
})
export class TreeNodeComponent {

  @Input() node!: any;
  @Input() isFirstLevelNode: boolean = true;
  
  constructor() {}

  ngOnInit() {}
}
