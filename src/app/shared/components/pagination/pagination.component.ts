import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  totalPages = input.required<number>();
  pagination = output<number>();

  currentPage = signal(1);
  isDesabledPrev = computed(() => this.currentPage() <= 1);
  isDesabledNext = computed(() => this.currentPage() >= this.totalPages());


  nextPage() {
    this.currentPage.update((currentPage) => currentPage + 1);
    this.pagination.emit(this.currentPage());
  }

  prevPage() {
    this.currentPage.update((currentPage) => currentPage - 1);
    this.pagination.emit(this.currentPage());
  }
}
