import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-skeleton',
  imports: [CommonModule, MatIconModule],
  templateUrl: './table-skeleton.component.html'
})
export class TableSkeletonComponent {
  columns = input<number>();
  rows = input<number>();

  generateArray(n: number): number[] {
    return Array(n).fill(0);
  }
}
