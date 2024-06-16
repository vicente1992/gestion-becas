import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from '@environments/environment.development';
import { LevelEducation } from '../models/leve-education';
import { Observable } from 'rxjs';

@Injectable()
export class LevelEducationService extends HttpService {
  #apiUrl = environment.apiUrl;

  getAll(): Observable<LevelEducation[]> {
    return this.doGet<LevelEducation[]>(`${this.#apiUrl}/level-education`);
  }

}
