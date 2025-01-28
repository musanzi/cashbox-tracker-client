import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminLinks } from '../../utils/data/links';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  adminLinks = adminLinks;
}
