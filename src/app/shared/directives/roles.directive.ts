import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Directive({
  selector: '[appRoles]',
  standalone: true
})
export class RolesDirective implements OnInit {
  private userService = inject(UserService);
  private element = inject(ElementRef);

  @Input() roles: string[] = [];

  user = this.userService.userInfo;

  constructor() {
    this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    const role = this.userService.userInfo()?.role ?? '';
    if (!this.roles.includes(role)) {
      this.element.nativeElement.style.display = 'none';
    }
  }


}
