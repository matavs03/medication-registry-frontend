import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../models/common';
import { MedicationFullView } from '../models/medication';
import { LetterFullView, LetterShortView } from '../models/letter';

export interface LetterSearchCriteria {
  title: string;
  medicationId: string;
  medicationName: string;
}

@Injectable({ providedIn: 'root' })
export class LetterService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/letters`;

  findAll(
    criteria: LetterSearchCriteria,
    page: number,
    size: number,
  ): Observable<Page<LetterShortView>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (criteria.title) params = params.set('title', criteria.title);
    if (criteria.medicationId) params = params.set('medicationId', criteria.medicationId);
    if (criteria.medicationName) params = params.set('medicationName', criteria.medicationName);

    return this.http.get<Page<LetterShortView>>(this.baseUrl, { params });
  }

  findById(id: string): Observable<LetterFullView> {
    return this.http.get<LetterFullView>(`${this.baseUrl}/${id}`);
  }

  downloadLetterFile(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob',
      observe: 'response',
    });
  }


}

