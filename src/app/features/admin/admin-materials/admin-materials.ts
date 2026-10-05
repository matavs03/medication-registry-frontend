import { Component, inject, signal } from '@angular/core';
import { EducationalMaterialService } from '../../../core/services/educational-material';
import {
  CreateEducationalMaterialRequest,
  EducationalMaterialFullView,
  EducationalMaterialShortView,
} from '../../../core/models/educational-material';
import { CreateContent, CreateContentData } from '../create-content/create-content';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { DatePipe } from '@angular/common';

@Component({
  imports: [CreateContent, ContentCard, Pagination, Modal, DatePipe],
  selector: 'app-admin-materials',
  styleUrl: './admin-materials.scss',
  templateUrl: './admin-materials.html',
})
export class AdminMaterials {
  private materialService = inject(EducationalMaterialService);

  materials = signal<EducationalMaterialShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  selectedMaterial = signal<EducationalMaterialFullView | null>(null);
  deleting = signal(false);

  creating = signal(false);
  saving = signal(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.materialService
      .findAll({ title: '', medicationName: '' }, this.currentPage(), 12)
      .subscribe({
        next: (page) => {
          this.materials.set(page.content);
          this.totalPages.set(page.totalPages);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
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

  deleteMaterial(material: EducationalMaterialFullView) {
    if (!confirm(`Obrisati materijal "${material.title}"? Ova radnja je trajna.`)) {
      return;
    }

    this.deleting.set(true);

    this.materialService.delete(material.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.closeDetails();
        this.load();
      },
      error: () => this.deleting.set(false),
    });
  }

  startCreating() {
    this.creating.set(true);
  }

  cancelCreating() {
    this.creating.set(false);
  }

  saveMaterial(data: CreateContentData) {
    this.saving.set(true);

    const request: CreateEducationalMaterialRequest = {
      title: data.title,
      description: data.description,
      medicationsIds: data.medicationsIds,
    };

    this.materialService.create(request, data.files).subscribe({
      next: () => {
        this.saving.set(false);
        this.creating.set(false);
        this.currentPage.set(0);
        this.load();
      },
      error: () => this.saving.set(false),
    });
  }
}
