import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';
import { AuthStore } from '@shared/store/Auth.store';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  private userService = inject(UserService);
  user = this.userService.userInfo;
  public authStore = inject(AuthStore);

  constructor() {

    this.userService.getCurrentUser();
  }

}
