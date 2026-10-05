import { Component, inject, signal } from '@angular/core';
import { LetterService } from '../../../core/services/letter';
import { CreateLetterRequest, LetterFullView, LetterShortView } from '../../../core/models/letter';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { DatePipe } from '@angular/common';
import { CreateContent, CreateContentData } from '../create-content/create-content';

@Component({
  imports: [ContentCard, Pagination, Modal, DatePipe, CreateContent],
  selector: 'app-admin-letters',
  styleUrl: './admin-letters.scss',
  templateUrl: './admin-letters.html',
})
export class AdminLetters {
  private letterService = inject(LetterService);

  letters = signal<LetterShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  selectedLetter = signal<LetterFullView | null>(null);
  deleting = signal(false);

  creating = signal(false);
  saving = signal(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.letterService
      .findAll({ title: '', medicationName: '' }, this.currentPage(), 12)
      .subscribe({
        next: (page) => {
          this.letters.set(page.content);
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

  openDetails(letter: LetterShortView) {
    this.letterService.findById(letter.id).subscribe({
      next: (full) => this.selectedLetter.set(full),
    });
  }

  closeDetails() {
    this.selectedLetter.set(null);
  }

  deleteLetter(letter: LetterFullView) {
    if (!confirm(`Obrisati pismo "${letter.title}"? Ova radnja je trajna.`)) {
      return;
    }

    this.deleting.set(true);

    this.letterService.delete(letter.id).subscribe({
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

  saveLetter(data: CreateContentData) {
    this.saving.set(true);

    const request: CreateLetterRequest = {
      title: data.title,
      description: data.description,
      medicationsIds: data.medicationsIds,
    };

    this.letterService.create(request, data.files[0]).subscribe({
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
