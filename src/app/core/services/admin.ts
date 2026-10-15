import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminView, CreateAdminRequest } from '../models/admin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Page } from '../models/common';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/admins`;

  findAll(page: number, size: number): Observable<Page<AdminView>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<AdminView>>(this.baseUrl, { params });
  }

  create(request: CreateAdminRequest): Observable<AdminView> {
    return this.http.post<AdminView>(this.baseUrl, request);
  }

  deactivate(id: string): Observable<AdminView> {
    return this.http.put<AdminView>(`${this.baseUrl}/${id}/deactivate`, {});
  }

  activate(id: string): Observable<AdminView> {
    return this.http.put<AdminView>(`${this.baseUrl}/${id}/activate`, {});
  }

  resetPassword(id: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/password`, { newPassword });
  }
}
