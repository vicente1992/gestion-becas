import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Params } from '@angular/router';
import { tap } from 'rxjs';
import { Application } from '@shared/models/application';
import { ApplicationService } from '@shared/services/application.service';
import { ApplicationsListComponent } from '../../components/applications-list/applications-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AuthStore } from '@shared/store/Auth.store';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    ApplicationsListComponent,
    PaginationComponent
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
  providers: [ApplicationService]
})
export default class ApplicationsComponent implements OnInit {
  #applicationService = inject(ApplicationService);
  #user = inject(AuthStore).user();
  applications = signal<Application[]>([]);
  page = signal<number>(1);
  limit = signal<number>(7);
  total = signal<number>(0);
  totalPages = computed(() => Math.ceil(this.total() / this.limit()));

  ngOnInit(): void {
    this.#getApplications();
  }

  #getApplications() {
    const params: Params = {
      page: this.page(),
      limit: this.limit(),
      userId: this.#user.id
    }
    this.#applicationService.getAll(params)
      .pipe(tap(({ data, count }) => {
        this.applications.set(data);
        this.total.set(count);
      })).subscribe();
  }

  onPagination(currentPage: number) {
    this.page.set(currentPage);
    this.#getApplications();
  }
}
