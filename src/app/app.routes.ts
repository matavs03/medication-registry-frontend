import { Routes } from '@angular/router';
import { MedicationList } from './features/public/medication-list/medication-list';

export const routes: Routes = [
  {path: 'medications', component: MedicationList},
  {path: '', redirectTo: 'medication', pathMatch: 'full'}
];
