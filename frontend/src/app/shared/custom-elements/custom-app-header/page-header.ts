import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html',
  styleUrls: ['page-header.scss'],
})
export class PageHeader implements OnInit {
  @Input() headerTitle: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private trackerService: TrackerService
  ) {}

  ngOnInit() {}

  logout() {
    this.confirmExit();
  }
 
  async confirmExit() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: "Are you sure you want to log out? All unsaved changes will be lost.",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
            // this.onClick.emit();
            // this.trackerService.initializeAllAction(this.toWelcome);
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }
}
