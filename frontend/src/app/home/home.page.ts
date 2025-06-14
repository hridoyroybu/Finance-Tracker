import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from 'src/app/services/tracker.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { APIService } from 'src/app/services/api-service';
import { PopUpService } from 'src/app/services/popup.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  titleHeader: any = 'Track Your Finances with Ease';

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private apiService: APIService,
    private trackerService: TrackerService,
    private popUpService: PopUpService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.apiService.getUser('bu_hridoy')
    .then(res => {
      console.log('User data:', res);
    })
    .catch(err => {
      console.error('Error fetching user:', err);
    });
  }
  
  
  showTree() {
    this.router.navigate(['/finance-tree'], { replaceUrl: true });
  }
}
