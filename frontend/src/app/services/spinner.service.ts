import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  constructor(
    public loadingController: LoadingController
  ) { }

  // Simple loader
  async showLoading() {
    const loading = await this.loadingController.create({
      // message: 'Loading...',
      cssClass: 'custom-loading',
      spinner: 'crescent'
    });

    loading.present();
  }

  // Dismiss loader
  hideLoading() {
    this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!');
    }).catch((err) => {
        console.log('Error occured : ', err);
    });
  }

  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: '',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }   
}