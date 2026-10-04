import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-content-card',
  styleUrl: './content-card.scss',
  templateUrl: './content-card.html',
})
export class ContentCard {
  title = input.required<string>();
  createdAt = input.required<string>();
  fileCount = input<number | null>(null);

  cardClick = output<void>();
}
