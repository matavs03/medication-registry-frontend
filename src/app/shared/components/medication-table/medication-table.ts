import { Component, input, output } from '@angular/core';
import { MedicationShortView } from '../../../core/models/medication';

@Component({
  imports: [],
  selector: 'app-medication-table',
  styleUrl: './medication-table.scss',
  templateUrl: './medication-table.html',
})
export class MedicationTable {
  medications = input.required<MedicationShortView[]>();
  selectable = input(false);
  selectedIds = input<string[]>([]);

  rowClick = output<MedicationShortView>();

  isSelected(medication: MedicationShortView): boolean {
    return this.selectedIds().includes(medication.id);
  }
}
