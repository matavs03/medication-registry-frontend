import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../models/common';
import { LetterFullView, LetterShortView } from '../models/letter';
import {
  EducationalMaterialFullView,
  EducationalMaterialShortView,
} from '../models/educational-material';

export interface EducationalMaterialSearchCriteria {
  title: string;
  medicationName: string;
}

@Injectable({ providedIn: 'root' })
export class EducationalMaterialService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/materials`;

  findAll(
    criteria: EducationalMaterialSearchCriteria,
    page: number,
    size: number,
  ): Observable<Page<EducationalMaterialShortView>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (criteria.title) params = params.set('title', criteria.title);
    if (criteria.medicationName) params = params.set('medicationName', criteria.medicationName);

    return this.http.get<Page<EducationalMaterialShortView>>(this.baseUrl, { params });
  }

  findById(id: string): Observable<EducationalMaterialFullView> {
    return this.http.get<EducationalMaterialFullView>(`${this.baseUrl}/${id}`);
  }

  downloadEducationalMaterialFile(id: string, fileId: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/${id}/files/${fileId}/download`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
