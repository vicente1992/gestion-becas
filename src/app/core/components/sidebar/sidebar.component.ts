import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '@features/auth/shared/services/auth.service';
import { AuthStore } from '@shared/store/Auth.store';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  #router = inject(Router);
  #authService = inject(AuthService);
  #user = inject(AuthStore).user();

  menuOptions: Array<any> = [
    {
      path: ['/', 'admin', 'grant'],
      icon: 'ri-school-line',
      tooltip: 'Becas',
      roles: ['admin'],
    },
    {
      path: ['/', 'admin', 'application'],
      icon: 'ri-function-line',
      tooltip: 'Aplicaciones a becas',
      roles: ['admin'],
    },
    {
      path: ['/', 'user', 'grant'],
      icon: 'ri-school-line',
      tooltip: 'Becas',
      roles: ['user'],
    },
    {
      path: ['/', 'user', 'application'],
      icon: 'ri-function-line',
      tooltip: 'Mis aplicaciones',
      roles: ['user'],
    },
  ];
  menu = signal<any[]>([]);

  ngOnInit(): void {
    const menu = this.menuOptions.filter((item) => item.roles.includes(this.#user.role))
    this.menu().push(...menu);
  }

  logout() {
    this.#authService.logout().then(() => {
      this.#router.navigate(['/', 'auth', 'login']);
    });
  }
}
