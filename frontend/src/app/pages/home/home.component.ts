import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService, Project, CaseStudy, Service } from '../../services/api.service';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CaseStudyCardComponent } from '../../components/case-study-card/case-study-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProjectCardComponent,
    CaseStudyCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  caseStudies: CaseStudy[] = [];
  services: Service[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.loading = true;
      this.error = null;

      const [projects, caseStudies, services] = await Promise.all([
        firstValueFrom(this.apiService.getProjects()).catch(() => null),
        firstValueFrom(this.apiService.getCaseStudies()).catch(() => null),
        firstValueFrom(this.apiService.getServices()).catch(() => null),
      ]);

      this.projects = projects || [];
      this.caseStudies = caseStudies || [];
      this.services = services || [];
    } catch (err) {
      this.error = 'Failed to load content. Please try again later.';
      console.error('Error loading data:', err);
    } finally {
      this.loading = false;
    }
  }

  scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

