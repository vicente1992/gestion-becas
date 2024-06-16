import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Params } from '@angular/router';
import { Application } from '@shared/models/application';
import { ApplicationService } from '@shared/services/application.service';
import { tap } from 'rxjs';
import { ApplicationsListComponent } from '../../components/applications-list/applications-list.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { Filter } from '@shared/models/filter';
import { UploadFileService } from '@shared/services/uploadFile.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    ApplicationsListComponent,
    PaginationComponent,
    FilterComponent
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
  providers: [ApplicationService, UploadFileService]
})
export default class ApplicationsComponent implements OnInit {
  #applicationService = inject(ApplicationService);
  #uploadFileService = inject(UploadFileService);
  applications = signal<Application[]>([]);
  page = signal<number>(1);
  limit = signal<number>(7);
  total = signal<number>(0);
  totalPages = computed(() => Math.ceil(this.total() / this.limit()));
  filter = signal<Partial<Filter>>({ title: '', status: '' });

  ngOnInit(): void {
    this.#getApplications();
  }

  #getApplications() {
    const params: Params = {
      page: this.page(),
      limit: this.limit(),
      ...this.filter()
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

  onLoad() {
    this.#getApplications()
  }

  onFilter(filter: Partial<Filter>) {
    this.filter.set(filter);
    this.page.set(1);
    this.#getApplications();
  }

  downloadExcel(): void {
    const params: Params = {
      ...this.filter()
    }
    this.#uploadFileService.generateReport(params).subscribe((base64) => {

      const binaryString = atob(base64);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);

      for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sample_export.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
