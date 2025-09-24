import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompetitionModel } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class MasterService {  
  $loginDone:Subject<void> = new Subject<void>
  
  constructor(private http:HttpClient) { }

  onSaveCompetition(data:CompetitionModel){
    return this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/competition",data)
  }

  getAllCompetition():Observable<CompetitionModel[]> {
    return this.http.get<CompetitionModel[]>("https://api.freeprojectapi.com/api/ProjectCompetition/GetAllCompetition")
  }
}
