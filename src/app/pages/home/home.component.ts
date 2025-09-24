import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionModel } from '../../models/competition';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  $eventList: Observable<CompetitionModel[]> = new Observable<CompetitionModel[]>
  eventList: CompetitionModel[] = [];
  pagedEvents: CompetitionModel[] = [];
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 4; // Show 4 events per page (2 rows x 2 columns)
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  
  masterService = inject(MasterService)

  constructor() {
    this.$eventList = this.masterService.getAllCompetition();
    
    // Subscribe to get the actual data for pagination
    this.$eventList.subscribe(events => {
      this.eventList = events;
      this.calculatePagination();
      this.updatePagedEvents();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.eventList.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedEvents = this.eventList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedEvents();
      
      // Scroll to events section smoothly
      const eventsSection = document.getElementById('events');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
}