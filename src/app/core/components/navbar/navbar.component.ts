import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@features/auth/shared/services/auth.service';
import { UserAvatarComponent } from '@shared/components/user-avatar/user-avatar.component';
import { RolesDirective } from '@shared/directives/roles.directive';
import { AuthStore } from '@shared/store/Auth.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserAvatarComponent,
    RolesDirective,
    NgOptimizedImage,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent {
  #router = inject(Router);
  #authService = inject(AuthService); 
  public isLoggedIn = inject(AuthStore).isAuthenticated();


  logout() {
    this.#authService.logout().then(() => {
      this.#router.navigate(['/', 'auth', 'login']);
    });
  }
}
