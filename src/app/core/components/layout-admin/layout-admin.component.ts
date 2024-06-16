import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent
  ],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent { }
