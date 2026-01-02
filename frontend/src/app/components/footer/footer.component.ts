import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { name: 'LinkedIn', url: '#', icon: 'linkedin' },
    { name: 'GitHub', url: '#', icon: 'github' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
  ];

  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/demos', label: 'Demos' },
    { path: '/contact', label: 'Contact' },
  ];
}
