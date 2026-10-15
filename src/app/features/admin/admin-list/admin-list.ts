import { Component, inject, signal } from '@angular/core';
import { AdminService } from '../../../core/services/admin';
import { AdminView } from '../../../core/models/admin';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Modal } from '../../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [Pagination, Modal, FormsModule],
  selector: 'app-admin-list',
  styleUrl: './admin-list.scss',
  templateUrl: './admin-list.html',
})
export class AdminList {
  private adminService = inject(AdminService);

  admins = signal<AdminView[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  loading = signal(false);
  error = signal('');

  selected = signal<AdminView | null>(null);
  creating = signal(false);
  changingPassword = signal(false);
  saving = signal(false);

  newAdmin = { firstName: '', lastName: '', username: '', password: '' };
  newPassword = '';

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);

    this.adminService.findAll(this.currentPage(), 20).subscribe({
      next: (page) => {
        this.admins.set(page.content);
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

  openDetails(admin: AdminView) {
    this.error.set('');
    this.changingPassword.set(false);
    this.newPassword = '';
    this.selected.set(admin);
  }

  closeDetails() {
    this.selected.set(null);
  }

  startCreating() {
    this.error.set('');
    this.newAdmin = { firstName: '', lastName: '', username: '', password: '' };
    this.creating.set(true);
  }

  closeCreating() {
    this.creating.set(false);
  }

  get canCreate(): boolean {
    return (
      this.newAdmin.firstName.trim().length > 0 &&
      this.newAdmin.lastName.trim().length > 0 &&
      this.newAdmin.username.trim().length > 0 &&
      this.newAdmin.password.length >= 6
    );
  }

  createAdmin() {
    if (!this.canCreate) return;

    this.saving.set(true);
    this.error.set('');

    this.adminService.create(this.newAdmin).subscribe({
      next: () => {
        this.saving.set(false);
        this.creating.set(false);
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Kreiranje nije uspelo.');
      },
    });
  }

  toggleActive(admin: AdminView) {
    this.saving.set(true);
    this.error.set('');

    const call = admin.active
      ? this.adminService.deactivate(admin.id)
      : this.adminService.activate(admin.id);

    call.subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.selected.set(updated);
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Promena statusa nije uspela.');
      },
    });
  }

  resetPassword(admin: AdminView) {
    if (this.newPassword.length < 6) return;

    this.saving.set(true);
    this.error.set('');

    this.adminService.resetPassword(admin.id, this.newPassword).subscribe({
      next: () => {
        this.saving.set(false);
        this.changingPassword.set(false);
        this.newPassword = '';
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Promena lozinke nije uspela.');
      },
    });
  }
}
