import { inject, Injectable, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthRequest, AuthResponse } from '../models/auth';
import { tap } from 'rxjs';

const STORAGE_KEY = 'auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;

  currentUser = signal<AuthResponse | null>(this.readFromStorage());

  login(request: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
        this.currentUser.set(response);
      }),
    );
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.currentUser.set(null);
  }

  get token(): string | null {
    return this.currentUser()?.token ?? null;
  }

  isLoggedIn(): boolean {
    const user = this.currentUser();
    if (!user) return false;

    if (new Date(user.expiresAt) <= new Date()) {
      this.logout();
      return false;
    }
    return true;
  }

  private readFromStorage(): AuthResponse | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
