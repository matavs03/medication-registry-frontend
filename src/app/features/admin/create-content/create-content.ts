import { Component, inject, input, output, signal } from '@angular/core';
import { MedicationSearchCriteria, MedicationService } from '../../../core/services/medication';
import { MedicationShortView } from '../../../core/models/medication';
import { FormsModule } from '@angular/forms';
import { MedicationTable } from '../../../shared/components/medication-table/medication-table';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';

export type ContentKind = 'letter' | 'material';

export interface CreateContentData {
  title: string;
  description: string;
  medicationsIds: string[];
  files: File[];
}

@Component({
  imports: [FormsModule, MedicationTable, Pagination, Modal],
  selector: 'app-create-content',
  styleUrl: './create-content.scss',
  templateUrl: './create-content.html',
})
export class CreateContent {
  private medicationService = inject(MedicationService);

  kind = input.required<ContentKind>();
  saving = input(false);

  cancelled = output<void>();
  submitted = output<CreateContentData>();

  medications = signal<MedicationShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  selected = signal<MedicationShortView[]>([]);
  selectedIds = signal<string[]>([]);

  formOpen = signal(false);
  title = '';
  description = '';
  files: File[] = [];

  criteria: MedicationSearchCriteria = { name: '', inn: '', atc: '', status: 'ACTIVE' };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.medicationService.findAll(this.criteria, this.currentPage(), 15).subscribe({
      next: (page) => {
        this.medications.set(page.content);
        this.totalPages.set(page.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
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

  toggle(medication: MedicationShortView) {
    const current = this.selected();
    const exists = current.some((m) => m.id === medication.id);

    const updated = exists
      ? current.filter((m) => m.id !== medication.id)
      : [...current, medication];

    this.selected.set(updated);
    this.selectedIds.set(updated.map((m) => m.id));
  }

  clearSelection() {
    this.selected.set([]);
    this.selectedIds.set([]);
  }

  openForm() {
    this.title = '';
    this.description = '';
    this.files = [];
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.files = input.files ? Array.from(input.files) : [];
  }

  get canSubmit(): boolean {
    return this.title.trim().length > 0 && this.files.length > 0;
  }

  submit() {
    if (!this.canSubmit) return;

    this.submitted.emit({
      title: this.title.trim(),
      description: this.description.trim(),
      medicationsIds: this.selectedIds(),
      files: this.files,
    });
  }
}
