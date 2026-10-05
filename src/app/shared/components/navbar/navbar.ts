import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = this.auth.currentUser;

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin']);
  }
}
