import { Component, input } from '@angular/core';
import { MedicationFullView } from '../../../core/models/medication';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-medication-details',
  styleUrl: './medication-details.scss',
  templateUrl: './medication-details.html',
})
export class MedicationDetails {
  medication = input.required<MedicationFullView>();
}
