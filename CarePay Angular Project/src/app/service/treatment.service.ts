import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TREATMENT_URL } from '../util/consts'
import { Treatment } from '../model/treatment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TreatmentService {
  constructor(private http: HttpClient) {}

  public getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(TREATMENT_URL);
  }
}