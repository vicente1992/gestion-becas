import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { environment } from '@environments/environment.development';
import { Application } from '@shared/models/application';

@Injectable()
export class ApplicationService extends HttpService {
  #apiUrl = environment.apiUrl;

  getAll(params?: Params): Observable<{ data: Application[], count: number }> {
    return this.doGet<{ data: Application[], count: number }>(`${this.#apiUrl}/application`, { ...params })
  }

  update(id: string, data: any): Observable<any> {
    return this.doPatch<any, any>(`${this.#apiUrl}/application/${id}`, data);
  }

  create(data: any): Observable<any> {
    return this.doPost<any>(`${this.#apiUrl}/application`, data);
  }

}
