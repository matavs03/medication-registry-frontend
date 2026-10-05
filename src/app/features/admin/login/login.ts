import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  submit() {
    if (!this.username || !this.password) return;

    this.loading.set(true);
    this.error.set('');

    this.auth.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => {
        this.error.set('Neispravno korisničko ime ili lozinka.');
        this.loading.set(false);
      },
    });
  }
}
