import { Component, inject, signal } from '@angular/core';
import { MedicationService } from '../../../core/services/medication';
import { MedicationShortView } from '../../../core/models/medication';
import { FormsModule } from '@angular/forms';
import { MedicationTable } from '../../../shared/components/medication-table/medication-table';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  imports: [FormsModule, MedicationTable, Pagination],
  selector: 'app-medication-list',
  styleUrl: './medication-list.scss',
  templateUrl: './medication-list.html',
})
export class MedicationList {
  private medicationService = inject(MedicationService);

  medications = signal<MedicationShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  searchName = '';

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.medicationService.findAll({ name: this.searchName }, this.currentPage(), 20).subscribe({
      next: (page) => {
        this.medications.set(page.content);
        this.totalPages.set(page.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  search() {
    this.currentPage.set(0);
    this.load();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.load();
  }
}
