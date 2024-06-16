import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Filter } from '@shared/models/filter';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  #destroy: DestroyRef = inject(DestroyRef);
  filter = output<Partial<Filter>>();

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  });


  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.#destroy), debounceTime(300),
        tap(() => this.filter.emit(this.form.value))
      ).subscribe();
  }

  resetForm() {
    this.form.patchValue({ title: '', status: '' });
    this.filter.emit(this.form.value);
  }
}
