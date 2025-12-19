import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private apiUrl = 'http://localhost:8000/api/bills';

  constructor(private http: HttpClient) {}

  getBills(search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${search}`);
  }
}
