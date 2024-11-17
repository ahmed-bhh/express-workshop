import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from './model/Stage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StageService {

  baseUrl = 'http://localhost:3000/stages';

  constructor(private http: HttpClient) { }

  getStages():Observable<Stage[]> {
    return this.http.get<Stage[]>(this.baseUrl);
  }

  getStageById(id: string):Observable<Stage> {
    return this.http.get<Stage>(`${this.baseUrl}/${id}`);
  }

  addStage(stage: any) {
    return this.http.post<Stage>(this.baseUrl, stage);
  }

  updateStage(stage: any) {
    return this.http.put<Stage>(`${this.baseUrl}/${stage.id}`, stage);
  }

  deleteStage(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
