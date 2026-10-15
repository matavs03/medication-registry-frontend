import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';

@Component({
  imports: [RouterLink, RouterLinkActive, FormsModule, Modal],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.currentUser;

  isSuperAdmin = computed(() => this.user()?.role === 'SUPER_ADMIN');

  menuOpen = signal(false);
  passwordOpen = signal(false);
  saving = signal(false);
  error = signal('');
  success = signal(false);

  oldPassword = '';
  newPassword = '';

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  openPasswordDialog() {
    this.menuOpen.set(false);
    this.oldPassword = '';
    this.newPassword = '';
    this.error.set('');
    this.success.set(false);
    this.passwordOpen.set(true);
  }

  closePasswordDialog() {
    this.passwordOpen.set(false);
  }

  get canSubmit(): boolean {
    return this.oldPassword.length > 0 && this.newPassword.length >= 6;
  }

  changePassword() {
    if (!this.canSubmit) return;

    this.saving.set(true);
    this.error.set('');

    this.auth.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.saving.set(false);
        this.success.set(true);
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err.error?.message ?? 'Promena lozinke nije uspela.');
      },
    });
  }

  logout() {
    this.menuOpen.set(false);
    this.auth.logout();
    this.router.navigate(['/admin']);
  }
}
