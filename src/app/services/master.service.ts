import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompetitionModel } from '../models/competition';

@Injectable({
  providedIn: 'root'
})
export class MasterService {  
  $loginDone:Subject<void> = new Subject<void>
  apiUrl:string = "https://api.freeprojectapi.com/api/ProjectCompetition/"
  
  constructor(private http:HttpClient) { }

  onSaveCompetition(data:CompetitionModel){
    return this.http.post(this.apiUrl + "competition",data)
  }

  getAllCompetition():Observable<CompetitionModel[]> {
    return this.http.get<CompetitionModel[]>( this.apiUrl + "GetAllCompetition")
  }

  onSubmitProject(projectObj:any):Observable<any> {
    return this.http.post<any>( this.apiUrl + "project",projectObj)
  }

  getAllSubmissionsByCompetitionId(competitionId:number):Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "project/byCompetition/" +competitionId)
  }

  approveProject(projectId:number):Observable<any>{
    return this.http.put<any>(this.apiUrl + "project/approve/" + projectId,{})
  }

  rejectProject(projectId:number):Observable<any> {
    return this.http.put<any>(this.apiUrl + "project/reject/" + projectId,{})
  }

}
