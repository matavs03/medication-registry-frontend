import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagination',
  styleUrl: './pagination.scss',
  templateUrl: './pagination.html',
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  previous(){
    this.pageChange.emit(this.currentPage() - 1);
  }

  next(){
    this.pageChange.emit(this.currentPage() + 1);
  }
}
