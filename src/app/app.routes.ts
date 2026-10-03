import { Routes } from '@angular/router';
import { MedicationList } from './features/public/medication-list/medication-list';
import { LetterList } from './features/public/letter-list/letter-list';
import { MaterialList } from './features/public/material-list/material-list';

export const routes: Routes = [
  { path: 'medications', component: MedicationList },
  { path: 'letters', component: LetterList },
  { path: 'materials', component: MaterialList },
  { path: '', redirectTo: 'medications', pathMatch: 'full' },
  { path: '**', redirectTo: 'medications' },
];
