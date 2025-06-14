import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from 'src/app/services/tracker.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { APIService } from 'src/app/services/api-service';
import { PopUpService } from 'src/app/services/popup.service';
import { Platform } from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  titleHeader: any = 'Welcome';
  currentYear: number = new Date().getFullYear();
  
  loginForm: UntypedFormGroup = this.formBuilder.group(
    {
      userName: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    },
  );

  isModalOpen: boolean = false;

  signUpForm: UntypedFormGroup = this.formBuilder.group(
    {
      userName: new UntypedFormControl('', Validators.required),
      displayname: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      confirmPassword: new UntypedFormControl('', Validators.required),
    },
  );
  
  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private apiService: APIService,
    private trackerService: TrackerService,
    private popUpService: PopUpService,
    private platform: Platform,
    private formBuilder: UntypedFormBuilder,
  ) {}

  

  ngOnInit() {
    console.log("homePage");
  }
  
  // async initDeviceUUID() {
  //   // this.spinnerService.showLoading();
  //   await this.apiService
  //   .getUUID()
  //   .then((uuid: any) => {
  //     console.log(uuid);
  //     this.apiService.setUUID(uuid);
  //   })
  //   .catch((fail) => {
  //     console.log(fail);
  //     this.popUpService.showAlert('Error', fail?.error?.message);
  //   })
  //   .finally(() => {
  //     // this.setDeviceId();
  //   });
  // }

  onClickShowModal() {
    this.isModalOpen = true;
  }

  onClickCancel() {
    this.isModalOpen = false;
  }

  onWillDismissModal(data: any) {
    this.isModalOpen = false;
  }

  login() {
    const payload = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    };

    console.log(payload)
    
    this.apiService.login(payload)
    .then((response: any) => {
      if (response.ok) {
        this.loginForm.reset();
        localStorage.setItem('access_token', response.access_token);
        this.popUpService.presentToast(response.message);
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    })
    .catch((err: any) => {
      this.popUpService.presentToast(err?.error?.message);
    });
  }

  signup() {
    const payload = {
      userName: this.signUpForm.value.userName,
      displayName: this.signUpForm.value.displayname,
      password: this.signUpForm.value.password,
    };
    
    // Calling the signUp method from apiService and passing the payload
    this.apiService.signUp(payload)
    .then((response: any) => {
      this.popUpService.presentToast(response.message);
      this.onClickCancel();
      this.signUpForm.reset();
    })
    .catch((err: any) => {
      this.popUpService.presentToast(err?.error?.message);
    });
  }

  isLoginFormValid() {
    return this.loginForm.valid;
  }

  isSignUpFormValid() {
    return this.signUpForm.valid;
  }
}
