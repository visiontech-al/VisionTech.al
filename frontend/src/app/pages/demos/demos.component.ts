import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ApiService, Demo } from '../../services/api.service';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.scss'],
})
export class DemosComponent implements OnInit {
  demos: Demo[] = [];
  filteredDemos: Demo[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDemos();
  }

  async loadDemos() {
    try {
      this.loading = true;
      this.error = null;

      const demos = await firstValueFrom(this.apiService.getDemos()).catch(() => null);
      this.demos = demos || [];
      this.filteredDemos = this.demos;

      // Extract unique categories
      const categorySet = new Set<string>();
      this.demos.forEach((demo) => {
        if (demo.category) {
          categorySet.add(demo.category);
        }
      });
      this.categories = Array.from(categorySet).sort();
    } catch (err) {
      this.error = 'Failed to load demos. Please try again later.';
      console.error('Error loading demos:', err);
    } finally {
      this.loading = false;
    }
  }

  filterByCategory(category: string | null) {
    this.selectedCategory = category;
    if (category) {
      this.filteredDemos = this.demos.filter(
        (demo) => demo.category === category,
      );
    } else {
      this.filteredDemos = this.demos;
    }
  }
}

