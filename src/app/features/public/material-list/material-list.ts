import { Component, inject, signal } from '@angular/core';
import {
  EducationalMaterialSearchCriteria,
  EducationalMaterialService,
} from '../../../core/services/educational-material';
import {
  EducationalMaterialFullView,
  EducationalMaterialShortView,
} from '../../../core/models/educational-material';
import { StoredFileView } from '../../../core/models/common';
import { FormsModule } from '@angular/forms';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { DatePipe } from '@angular/common';

@Component({
  imports: [FormsModule, ContentCard, Pagination, Modal, DatePipe],
  selector: 'app-material-list',
  styleUrl: './material-list.scss',
  templateUrl: './material-list.html',
})
export class MaterialList {
  private materialService = inject(EducationalMaterialService);

  materials = signal<EducationalMaterialShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  selectedMaterial = signal<EducationalMaterialFullView | null>(null);

  criteria: EducationalMaterialSearchCriteria = {
    title: '',
    medicationName: '',
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.materialService.findAll(this.criteria, this.currentPage(), 12).subscribe({
      next: (page) => {
        this.materials.set(page.content);
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

  reset() {
    this.criteria = { title: '', medicationName: '' };
    this.search();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.load();
  }

  openDetails(material: EducationalMaterialShortView) {
    this.materialService.findById(material.id).subscribe({
      next: (full) => this.selectedMaterial.set(full),
    });
  }

  closeDetails() {
    this.selectedMaterial.set(null);
  }

  download(materialId: string, file: StoredFileView) {
    this.materialService.downloadEducationalMaterialFile(materialId, file.id).subscribe({
      next: (response) => {
        const blob = response.body;
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.originalFileName;
        link.click();
        URL.revokeObjectURL(url);
      },
    });
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
