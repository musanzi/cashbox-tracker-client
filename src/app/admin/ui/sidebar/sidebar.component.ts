import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminLinks } from '../../utils/data/links';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../shared/utils/types/models.type';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterModule, ApiImgPipe],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  user = input.required<IUser>();
  adminLinks = adminLinks;
}
