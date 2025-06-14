import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TrackerService } from 'src/app/services/tracker.service';
import { PopUpService } from 'src/app/services/popup.service';

@Component({
  selector: 'tansactioon-details.component',
  templateUrl: 'tansactioon-details.component.html',
  styleUrls: ['tansactioon-details.component.scss'],
})
export class TransactionDetailsFormComponent implements OnInit{
  titleHeader: any = "Add New Transaction Details";
  isShowAlertOptions: boolean = false;
  isKeyboardHide: boolean = false;
  inputElementMap: Map<number, IonInput> = new Map();
  lastModifiedFieldId: number = 0;
  selectedNetworkOption: string = 'deposit';

  transactionRecordForm: UntypedFormGroup = this.formBuilder.group(
    {
      date: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      amount: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      note: new UntypedFormControl(''),
    },
  );

  @ViewChild('dateInput', { static: true }) dateInput!: IonInput;
  @ViewChild('amountInput', { static: true }) amountInput!: IonInput;
  @ViewChild('noteInput', { static: true }) noteInput!: IonInput;
  @ViewChild('submitBtn', { static: true }) submitBtn!: IonInput;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private spinnerService: SpinnerService,
    private popUpService: PopUpService,
    private trackerService: TrackerService
  ) {}

  ngOnInit() {
    this.initKeyboardConfiguration();
  }

  initKeyboardConfiguration() {
    document.addEventListener('click', this.onClickContent.bind(this));
    this.setKeyboardResizeMode();

    Keyboard.addListener('keyboardWillShow', info => {
      this.isKeyboardHide = false;
    });
    
    Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardHide = true;
    });
  }

  ngAfterViewInit() {
    this.inputElementMap.set(1, this.dateInput);
    this.inputElementMap.set(2, this.amountInput);
    this.inputElementMap.set(3, this.noteInput);
  }

  handleScrollStart() {
    this.submitBtn?.setFocus();
  }
  
  handleScrollEnd() {
    if (this.inputElementMap.has(this.lastModifiedFieldId)) {
      this.inputElementMap.get(this.lastModifiedFieldId)?.setFocus();
    }
  }

  currentFocusedField(id: number) {
    this.lastModifiedFieldId = id;
  }
  
  onClickContent(event: any) {
    const clickedOnInput = event.target.closest('ion-input') !== null || event.target.closest('input') !== null;
    
    if (!clickedOnInput) {
      this.lastModifiedFieldId = 0;
    }
  }
  
  async setKeyboardResizeMode() {
    await Keyboard.setResizeMode({ mode: 'body' as KeyboardResize });
  }

  onClickSaveSettings() {
  }

  formValid() {
    return this.transactionRecordForm.valid;
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickContent.bind(this));
  }
}
