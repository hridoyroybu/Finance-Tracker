import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TrackerService } from 'src/app/services/tracker.service'
import { SpinnerService } from 'src/app/services/spinner.service';
import { APIService } from 'src/app/services/api-service';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopUpService } from 'src/app/services/popup.service';
@Component({
  selector: 'sap-scanner',
  templateUrl: 'sap-scanner.html',
  styleUrls: ['sap-scanner.scss'],
})
export class SAPScannerComponent implements OnInit {
  titleHeader: any = "Install SAP";
  scannedResult: string | undefined;
  firstStepDone: boolean = false;
  scanActive: boolean = false;

  constructor(
    private router: Router,
    private trackerService: TrackerService,
    private spinnerService: SpinnerService,
    private apiService: APIService,
    public platform: Platform,
    private popupService: PopUpService
  ) {}

  ngOnInit() {
  }

  async checkPermission() {
    try {
      const statusRequest = await BarcodeScanner.checkPermission({ force: true });
      
      return !!statusRequest.granted;

    } catch(e) {
      return false;
    }
  }

  async startScan() {
    if (this.platform.is('mobileweb')) {
      this.scannedResult = 'fpf7361'; // 'ygf70cb';
      return;
    }

    try {
      const permission = await this.checkPermission();
      if(!permission) {
        const message = "Camera permission needs to be turned on to scan the barcode.";
        this.popupService.showAlert('Alert', message);
        return;
      }
      
      this.scanActive = true;
      await BarcodeScanner.hideBackground();
      document.body.style.opacity = '0.2';
      document.body.style.background = 'transparent';

      const result = await BarcodeScanner.startScan();

      if(result?.hasContent) {
        this.scanActive = false;
        this.scannedResult = result.content;
        this.stopScan();
      } else {
        this.stopScan();
      }
      
    } catch(e) {
      this.stopScan();
    }
  }

  stopScan() {
    document.body.style.background = '#394052';
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.body.style.opacity = '1';
    this.scanActive = false;
  }


  onClickGetSAP() {
    this.spinnerService.showLoading();
    this.apiService
    .getSAP(this.scannedResult)
    .then((res: any) => {
      this.spinnerService.hideLoading();
      this.checkSAPBound(res.sap);
      this.trackerService.setSAP(res.sap);
    })
    .catch((fail: any) => {
      console.log(fail);
      this.spinnerService.hideLoading();
      this.popupService.showAlert('Alert', fail?.error?.message);
    });
  }

  /**
   * check if the sap has already bound to a location
   */
  checkSAPBound(sapInfo: any) {
    if (sapInfo.location_id) {
      this.router.navigate(['/bound-sap'], { replaceUrl: true })
    } else {
      this.router.navigate(['/unbound-sap'], { replaceUrl: true })
    }
  }

  onClickfirstStep() {
    this.firstStepDone = true;
  }

  ngOnDestroy() {
    this.stopScan();
  }
 }
