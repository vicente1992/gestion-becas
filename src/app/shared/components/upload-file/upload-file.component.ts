import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, computed, inject, input, output, signal } from '@angular/core';
import { SnackBarService } from '@core/services/snack-bar.service';
import { IVALID_EXTENSION } from '@shared/constants/messages';
import { UploadFileService } from '@shared/services/uploadFile.service';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
  providers: [UploadFileService]
})
export class UploadFileComponent {
  #uploadFileService = inject(UploadFileService);
  #snackBarService = inject(SnackBarService);
  @ViewChild('fileInput') fileInput: any;
  file = output<string>();
  @Input()
  set fileUrl(url: string) {
    if (url) {
      this.filePreview.set(url);
    }
  }
  fileExtensions = input.required<string[]>();
  filePreview = signal<string>('');
  fileExists = computed(() => !!this.filePreview().length);
  extensions = computed(() => this.fileExtensions().join(','));

  onChangeFile(event: any) {
    const [file] = event.target.files;
    if (!file) return;
    if (!this.isValidExtension(file)) {
      return this.#snackBarService.openSnackBar(IVALID_EXTENSION);
    }
    this.displayImagePreview(file);
    this.uploadFile(file);
  }

  displayImagePreview(file: File): void {
    var reader = new FileReader();
    reader.onload = () => {
      const logo = String(reader.result);
      this.filePreview.set(logo);
    };
    reader.readAsDataURL((file));
  }

  removeImage(): void {
    this.filePreview.set('');
    this.#resetFileInput();
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.#uploadFileService.uploadFile(formData).subscribe((logo) => {
      if (logo) {
        this.file.emit(logo);
      }
    });
  }

  #resetFileInput() {
    this.fileInput.nativeElement.value = '';
  }

  isValidExtension(file: File): boolean {
    const extension = file.name.split('.').pop() ?? '';
    return this.fileExtensions().includes(extension);
  }

  // PNG, JPG, GIF
}
