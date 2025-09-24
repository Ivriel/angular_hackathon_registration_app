import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetitionModel } from '../../models/competition';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-events',
  standalone: true, // gunakan standalone biar lebih modular
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  // State
  competitionObj: CompetitionModel = new CompetitionModel();
  competitionList: CompetitionModel[] = [];
  pagedCompetitions: CompetitionModel[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 4;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  /** Load all competitions from API */
  getAllData(): void {
    this.masterService.getAllCompetition().subscribe({
      next: (res: CompetitionModel[]) => {
        this.competitionList = res || [];
        this.setupPagination();
        console.log("Competitions loaded:", this.competitionList);
      },
      error: (error: any) => {
        console.error("Error getting events:", error);
        alert("Failed to load competitions.");
      }
    });
  }

  onReset(){
    this.competitionObj = new CompetitionModel()
  }

  /** Save competition to backend */
  onSave(): void {
    if (!this.competitionObj.title || !this.competitionObj.description) {
      alert("Please fill all required fields.");
      return;
    }

    this.masterService.onSaveCompetition(this.competitionObj).subscribe({
      next: () => {
        alert("✅ Competition saved successfully!");
        this.competitionObj = new CompetitionModel();
        this.getAllData(); // reload list
      },
      error: (error: any) => {
        console.error("Error sending event:", error);
        alert("❌ Failed to save competition.");
      }
    });
  }

  /** Initialize pagination after fetching data */
  setupPagination(): void {
    this.totalPages = Math.ceil(this.competitionList.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  /** Change current page */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCompetitions = this.competitionList.slice(start, end);
  }
}
