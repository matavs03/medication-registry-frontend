import { inject, Injectable, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MedicationFullView, MedicationShortView } from '../models/medication';
import { Page } from '../models/common';

export interface MedicationSearchCriteria{
  name?: string;
  inn?: string;
  atc?: string;
  status?: string;
}

@Injectable({providedIn: 'root'})
export class MedicationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/medications`;

  findAll(criteria: MedicationSearchCriteria, page: number, size: number): Observable<Page<MedicationShortView>>{
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (criteria.name) params = params.set('name', criteria.name);
    if (criteria.inn) params = params.set('inn', criteria.inn);
    if (criteria.atc) params = params.set('atc', criteria.atc);
    if (criteria.status) params = params.set('status', criteria.status);

    return this.http.get<Page<MedicationShortView>>(this.baseUrl, { params });
  }

  findById(id: string): Observable<MedicationFullView>{
    return this.http.get<MedicationFullView>(`${this.baseUrl}/${id}`);
  }
}
