import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ft-button',
  templateUrl: './ft-button.component.html',
  styleUrls: ['./ft-button.component.scss'],
})
export class FTButtonComponent implements OnInit, OnDestroy {

  @Input() full: boolean = false;
  @Input() disabled: boolean = false;
  @Input() buttonName: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  ngOnDestroy() {}
}
