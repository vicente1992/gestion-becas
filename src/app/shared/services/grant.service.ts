import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { environment } from '@environments/environment.development';
import { Grant } from '@shared/models/grant';
import { Observable, } from 'rxjs';

@Injectable()
export class GrantService extends HttpService {
  #apiUrl = environment.apiUrl;

  getAll(params?: Params): Observable<{ data: Grant[], count: number }> {
    return this.doGet<{ data: Grant[], count: number }>(`${this.#apiUrl}/grant`, { ...params })
  }
  getOne(id: string): Observable<Grant> {
    return this.doGet<any>(`${this.#apiUrl}/grant/${id}`);
  }

  create(data: any): Observable<any> {
    return this.doPost<any>(`${this.#apiUrl}/grant`, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.doPatch<any, any>(`${this.#apiUrl}/grant/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.doDelete<string>(`${this.#apiUrl}/grant/${id}`);
  }

}
