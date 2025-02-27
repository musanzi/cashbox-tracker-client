import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatIconModule],
  templateUrl: './table.component.html'
})
export class TableComponent {
  columns = input<{ key: string; label: string }[]>([]);
  data = input([]);
  actions? = input<{ icon: string; fn: (item: unknown) => void }[]>();

  getValue(item: unknown, key: string): string {
    if (!key.includes('.')) return item[key];
    const keys: string[] = key.split('.');
    return item[keys[0]][keys[1]];
  }
}
