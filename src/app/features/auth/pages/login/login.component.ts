import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@features/auth/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgOptimizedImage],
  providers: [AuthService],
})
export default class LoginComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });;

  login() {
    this.#authService.login(this.form.value).subscribe(() => this.goToHome());
  }

  goToHome() {
    this.#router.navigate(['']);
  }
}
