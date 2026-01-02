import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../services/api.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: Project;
}

