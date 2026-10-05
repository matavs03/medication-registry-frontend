import { Component, inject, signal } from '@angular/core';
import { LetterSearchCriteria, LetterService } from '../../../core/services/letter';
import { LetterFullView, LetterShortView } from '../../../core/models/letter';
import { DatePipe } from '@angular/common';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DatePipe, ContentCard, Pagination, Modal, FormsModule],
  selector: 'app-letter-list',
  styleUrl: './letter-list.scss',
  templateUrl: './letter-list.html',
})
export class LetterList {
  private letterService = inject(LetterService);

  letters = signal<LetterShortView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);

  selectedLetter = signal<LetterFullView | null>(null);

  criteria: LetterSearchCriteria = {
    title: '',
    medicationName: ''
  };

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.letterService.findAll(this.criteria, this.currentPage(), 12).subscribe({
      next: (page) => {
        this.letters.set(page.content);
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

  openDetails(letter: LetterShortView) {
    this.letterService.findById(letter.id).subscribe({
      next: (full) => this.selectedLetter.set(full),
    });
  }

  closeDetails() {
    this.selectedLetter.set(null);
  }

  download(letter: LetterFullView) {
    this.letterService.downloadLetterFile(letter.id).subscribe({
      next: (response) => {
        const blob = response.body;
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = letter.storedFile.originalFileName;
        link.click();
        URL.revokeObjectURL(url);
      },
    });
  }
}
