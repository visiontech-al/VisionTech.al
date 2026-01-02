import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudy } from '../../services/api.service';

@Component({
  selector: 'app-case-study-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-study-card.component.html',
  styleUrls: ['./case-study-card.component.scss'],
})
export class CaseStudyCardComponent {
  @Input() caseStudy!: CaseStudy;
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}

