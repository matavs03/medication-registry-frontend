import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../models/common';
import { SyncLogView } from '../models/sync';

@Injectable({ providedIn: 'root' })
export class SyncService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/sync`;

  findLogs(page: number, size: number): Observable<Page<SyncLogView>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<SyncLogView>>(`${this.baseUrl}/logs`, { params });
  }

  runSync(): Observable<void> {
    return this.http.post<void>(this.baseUrl, {});
  }
}
