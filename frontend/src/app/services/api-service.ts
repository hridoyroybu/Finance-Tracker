import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Device } from '@capacitor/device';
import { TrackerService } from './tracker.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

declare var google: any;

@Injectable({
  providedIn: 'root',
})

export class APIService {
  private baseUrl = 'http://localhost:3000';
  private readonly security_key = '7MC7TblxX5yVIfDh0Sv90ERyxMMXLcoQV'; // default
  private uuid = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private trackerService: TrackerService
  ) {}

  signup(payload: any) {
    const url = `${this.baseUrl}/api/users/signup`;
    return new Promise((resolve, reject) => {
      this.http
      .post(url, JSON.stringify(payload))
      .subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    })
  }

  login(payload: { userName: string; password: string }): Promise<any> {
    const url = `${this.baseUrl}/api/users/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, payload, { headers }).toPromise();
  }
  
  signUp(payload: { userName: string; displayName: string; password: string }): Promise<any> {
    const url = `${this.baseUrl}/api/users/signup`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, payload, { headers }).toPromise();
  }

  async refreshToken(): Promise<string> {
    const response = await lastValueFrom(
      this.http.post<{ access_token: string }>(
        '/api/refresh-token',
        {},
        { withCredentials: true }
      )
    );

    return response.access_token;
  }

  async getUser(userName: string): Promise<any> {
    await lastValueFrom(this.http.post('/api/users/get-user', { userName }));
  }  

  logout() {
    localStorage.removeItem('access_token');
    this.http.post('/api/logout', {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  uploadPhoto(locationId: string, photoData: any, isCreate: boolean = false) {
    const locationType = isCreate ? 'provisional_location_id' : 'location_id';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const body = {
      file_content: photoData.file_content,
      file_group_id: Number(photoData.file_group_id),
      file_type: photoData.file_type,
      file_category_id: Number(photoData.file_category_id),
    };
    
    const options = {
      headers: headers
    }

    return new Promise((resolve, reject) => {

      const url = `${this.baseUrl}/deploylocation/uploadFiles?security_key=${this.security_key}&${locationType}=${locationId}`;
      this.http
      .put(url, JSON.stringify(body), options)
      .subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    })
  }
}
