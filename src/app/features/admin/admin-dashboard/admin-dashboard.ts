import { Component, inject, signal } from '@angular/core';
import { SyncService } from '../../../core/services/sync';
import { SyncLogView } from '../../../core/models/sync';
import { DatePipe } from '@angular/common';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  imports: [DatePipe, Pagination],
  selector: 'app-admin-dashboard',
  styleUrl: './admin-dashboard.scss',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard {
  private syncService = inject(SyncService);

  logs = signal<SyncLogView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);
  syncing = signal(false);
  syncError = signal('');

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.syncService.findLogs(this.currentPage(), 15).subscribe({
      next: (page) => {
        this.logs.set(page.content);
        this.totalPages.set(page.totalPages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  runSync() {
    this.syncing.set(true);
    this.syncError.set('');

    this.syncService.runSync().subscribe({
      next: () => {
        this.syncing.set(false);
        this.currentPage.set(0);
        this.load();
      },
      error: () => {
        this.syncing.set(false);
        this.syncError.set('Sinhronizacija nije uspela.');
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.load();
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'SUCCESS':
        return 'Uspešno';
      case 'FAILED':
        return 'Neuspešno';
      case 'REJECTED':
        return 'Odbijeno';
      default:
        return status;
    }
  }
}
