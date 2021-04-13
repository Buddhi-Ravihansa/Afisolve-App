import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signupUrl = 'http://localhost:3000/authentication/register';
  loginUrl = 'http://localhost:3000/authentication/login';
  roleChangeUrl = 'http://localhost:3000/authentication/role-change';

  constructor(private http1: HttpClient,
              private router: Router) {
  }

  signup(userData, otp): Observable<any> {
    return this.http1.post<any>(this.signupUrl, {userData, otp});
  }

  login(userData): Observable<any> {
    return this.http1.post<any>(this.loginUrl, userData);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  roleChange(userData): Observable<any> {
    return this.http1.post<any>(this.roleChangeUrl, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  get token(): string {
    try {
      return localStorage.getItem('token');
    } catch (Exception) {
      return null;
    }
  }

}
