import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  showAlert(title: string, message: string,  nextRoute: any = null) {
    if (!message || message === '') {
      message = 'Internal server error. Please check the network connection.';
    }
  
    this.alertController
      .create({
        header: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              if (nextRoute !== '') {
                if (nextRoute) {
                  this.router.navigate([nextRoute], { replaceUrl: true });
                }
              }
            }
          }
        ]
      })
      .then(async (alert) => await alert.present());
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'light'
    });

    await toast.present();
  }
}