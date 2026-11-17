import { Component, inject, signal } from '@angular/core';
import { MedicationSearchCriteria, MedicationService } from '../../../core/services/medication';
import { MedicationFullView, MedicationShortView } from '../../../core/models/medication';
import { FormsModule } from '@angular/forms';
import { MedicationTable } from '../../../shared/components/medication-table/medication-table';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { MedicationDetails } from '../medication-details/medication-details';

@Component({
  imports: [FormsModule, MedicationTable, Pagination, Modal, MedicationDetails],
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
  error = signal<string | null>(null);

  selectedMedication = signal<MedicationFullView | null>(null);

  criteria: MedicationSearchCriteria = {
    name: '',
    inn: '',
    atc: '',
    status: '',
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.medicationService.findAll(this.criteria, this.currentPage(), 20).subscribe({
      next: (page) => {
        this.medications.set(page.content);
        this.totalPages.set(page.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Došlo je do greške');
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

  reset() {
    this.criteria = { name: '', inn: '', atc: '', status: '' };
    this.search();
  }

  openDetails(medication: MedicationShortView) {
    this.error.set(null);

    this.medicationService.findById(medication.id).subscribe({
      next: (full) => this.selectedMedication.set(full),
      error: () => this.error.set('Došlo je do greške'),
    });
  }

  closeDetails() {
    this.selectedMedication.set(null);
  }
}
