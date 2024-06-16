import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { environment } from '@environments/environment.development';
import { Observable, map } from 'rxjs';


@Injectable()
export class UploadFileService extends HttpService {
  #apiUrl = environment.apiUrl;

  uploadFile(formData: FormData): Observable<string> {
    return this.doPost<any>(`${this.#apiUrl}/grant/upload`, formData)
      .pipe(map(({ imageUrl }) => imageUrl))
  }

  generateReport(params?: Params): Observable<string> {
    return this.doGet(`${this.#apiUrl}/application/report`, { ...params });
  }

}
