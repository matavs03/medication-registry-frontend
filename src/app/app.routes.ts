import { Routes } from '@angular/router';
import { MedicationList } from './features/public/medication-list/medication-list';
import { LetterList } from './features/public/letter-list/letter-list';
import { MaterialList } from './features/public/material-list/material-list';
import { Login } from './features/admin/login/login';
import { authGuard } from './core/guards/auth-guard';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: 'medications', component: MedicationList },
  { path: 'letters', component: LetterList },
  { path: 'materials', component: MaterialList },
  { path: '', redirectTo: 'medications', pathMatch: 'full' },
  { path: 'admin', component: Login },
  { path: 'admin/dashboard', component: AdminDashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: 'medications' },
];
