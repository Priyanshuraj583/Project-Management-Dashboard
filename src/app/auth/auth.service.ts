import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:52443/api/auth'; // API endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    // Mock login API
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  signup(username: string, password: string): Observable<boolean> {
    // Mock signup API
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password }).pipe(
      map(response => !!response.success),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}