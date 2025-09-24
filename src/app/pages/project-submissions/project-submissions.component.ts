import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-project-submissions',
  imports: [MatTableModule,MatPaginatorModule,CommonModule],
  templateUrl: './project-submissions.component.html',
  styleUrl: './project-submissions.component.css'
})
export class ProjectSubmissionsComponent implements OnInit{
 
  submissionList: any[] = []; 
  paginatedData: any[] = [];
  currentCompetitionId:number =0

   constructor(private route:ActivatedRoute,private masterService:MasterService){
    this.route.params.subscribe((res:any)=> {
      this.currentCompetitionId = res.id
    })
   }
  

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  startIndex = 0;
  endIndex = 0;

  ngOnInit(): void {
      this.loadSubmissions()
  }

  loadSubmissions() {
    // Call API service
    this.masterService.getAllSubmissionsByCompetitionId(this.currentCompetitionId).subscribe({
      next:(res:any[]) => {
        this.submissionList = res
        this.totalItems = res.length
        this.updatePaginatedData()
        console.log(this.submissionList)
      },
      error:(error:any)=> {
        console.error("Error fetching competition data by id: ",error)
        alert("Error fetching competition data")
      }
    })
    
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    this.startIndex = this.currentPage * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalItems);
    this.paginatedData = this.submissionList.slice(this.startIndex, this.endIndex);
  }

  onApprove(submissionId:number){
      this.masterService.approveProject(submissionId).subscribe((res)=> {
        this.loadSubmissions()
      },
      error=> {
        this.loadSubmissions()
      }
    )
  }

  onReject(submissionId:number) {
    this.masterService.rejectProject(submissionId).subscribe({
      next:()=> {
        this.loadSubmissions()
      },
      error:()=> {
        this.loadSubmissions()
      }
    })
  }

}
