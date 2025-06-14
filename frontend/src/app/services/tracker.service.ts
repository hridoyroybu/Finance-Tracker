import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  // TODO: change the activateTestVersion to false for production release
  public activateTestDeployment: boolean = true;

  private managerInfoDetails: any;
  private deviceId: any;
  private cwmMacAddress: any;
  
  private location_id: any;
  private isProvisionalLocation: boolean = false;
  
  private isGetOnlineDone: boolean = false;
  private isEquipmentLinked: boolean = false;
  private isLocationSetupDone: boolean = false;
  
  private hitsToConnectEquipment: number = 0; // 3 hits allowed
  private hitsToConnectSAP: number = 1;
  private hitsToConnectCWM: number = 1;
  private maxAllowedHits: number = 3;
  
  private connnectedWifiNetwork: any;
  private cwmNetworkConfigSettings: any;

  private ethernetConfigurationStatus: boolean = false;
  private wirelessConfigurationStatus: boolean = false;

  locationSetupId: any = 0;
  getOnlineId: any = 1;
  linkEquipmentId: any = 2;
  sapInfo: any;
  
  constructor() { }

  // Getter and Setter methods for tracking completion of Location Setup, GetOnline and Link Equipment flows.
  public getIsLocationSetupDone() {
    return this.isLocationSetupDone;
  }

  public setAsLocationSetupDone(status: boolean) {
    this.isLocationSetupDone = status;
  }

  public getIsEquipmentLinked() {
    return this.isEquipmentLinked;
  }

  public setAsEquipmentLinked(status: boolean) {
    this.isEquipmentLinked = status;
  }

  public getGetOnline() {
    return this.isGetOnlineDone;
  }

  public setGetOnline(status: boolean) {
    this.isGetOnlineDone = status;
  }

  // Getter and Setter methods for tracking completion of Configure Ethernet or Configure Wireless proccess.
  public hasEthernetConfigured() {
    return this.ethernetConfigurationStatus;
  }

  public setAsEthernetConfigured(status: boolean) {
    this.ethernetConfigurationStatus = status;
  }

  public hasWirelessConfigured() {
    return this.wirelessConfigurationStatus;
  }

  public setAsWirelessConfigured(status: boolean) {
    this.wirelessConfigurationStatus = status;
  }

  // Used to track the number of hits/retries with a loading spinner.
  public updateConnectSAPtHits() {
    this.hitsToConnectSAP = this.hitsToConnectSAP + 1;
  }

  public isAllowedtoConnectSAP() {
    return this.hitsToConnectSAP <= this.maxAllowedHits;
  }

  public updateCwmMissHits() {
    this.hitsToConnectCWM = this.hitsToConnectCWM + 1;
  }

  public isAllowedtoTryCWMagain() {
    return this.hitsToConnectCWM < this.maxAllowedHits;
  }

  public updateConnectEquipmentHits() {
    this.hitsToConnectEquipment = this.hitsToConnectEquipment + 1;
  }

  public isAllowedtoConnectEquipment() {
    return this.hitsToConnectEquipment <= this.maxAllowedHits;
  }

  public clearConnectEquipmentHits() {
    this.hitsToConnectEquipment = 0;
  }

  // Install SAP process
  public getSAP() {
    return this.sapInfo;
  }

  public setSAP(sap: any) {
    this.sapInfo = sap;
  }

  public getCWMmacAddress() {
    return this.cwmMacAddress;
  }

  public setCWMmacAddress(mac_address: any) {
    this.cwmMacAddress = mac_address;
  }

  public getIsProvisionalLocation() {
    return this.isProvisionalLocation;
  }

  public setAsProvisionalLocation(isCreate: boolean) {
    this.isProvisionalLocation = isCreate;
  }

  public setLocationId(id: any) {
    this.location_id = id;
  }

  public getLocationId() {
    return this.location_id;
  }

  public getWifiNetwork() {
    return this.connnectedWifiNetwork;
  }

  public setWifiNetwok(ssid: any) {
    this.connnectedWifiNetwork = ssid;
  }

  public getManagerInfo() {
    return this.managerInfoDetails;
  }

  public setManagerInfo(managerInfo: any) {
    this.managerInfoDetails = managerInfo;
  }

  public setCWMNetworkConfig(config: any) {
    this.cwmNetworkConfigSettings = config;
  }

  public getCWMNetworkConfig() {
    return this.cwmNetworkConfigSettings;
  }

  public getCurrentPendingSate(): number {
    if (!this.getIsLocationSetupDone()) {
      return this.locationSetupId;
    }
    
    if (!this.getGetOnline()) {
      return this.getOnlineId;
    }
    
    if (!this.getIsEquipmentLinked()) {
      return this.linkEquipmentId;
    }

    return -1;
  }

  public initializeAllAction(removeAll: boolean): any {
    this.clearConnectEquipmentHits();

    if (removeAll) {
      this.setGetOnline(false);
      this.setAsEquipmentLinked(false);
      this.setAsLocationSetupDone(false);
    }
  }

  // Called when exit the app
  public clearAlltheSaveData(): any {
    this.hitsToConnectCWM = 1;
    this.hitsToConnectSAP = 1;

    this.setAsLocationSetupDone(false);
    this.setGetOnline(false);
    this.setAsEquipmentLinked(false);
    this.setAsEthernetConfigured(false);
    this.setAsWirelessConfigured(false);
  }
}
