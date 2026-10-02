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

    this.medicationService.findAll(this.criteria, this.currentPage(), 20).subscribe({
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

  reset() {
    this.criteria = { name: '', inn: '', atc: '', status: '' };
    this.search();
  }

  openDetails(medication: MedicationShortView) {
    this.medicationService.findById(medication.id).subscribe({
      next: (full) => this.selectedMedication.set(full),
    });
  }

  closeDetails() {
    this.selectedMedication.set(null);
  }
}
