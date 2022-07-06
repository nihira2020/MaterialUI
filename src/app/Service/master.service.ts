import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiurl = 'https://localhost:44308/Employee';

  constructor(private http: HttpClient) {

  }
  GetEmployee(): Observable<Employee> {
    return this.http.get<Employee>(this.apiurl);
  }
}
