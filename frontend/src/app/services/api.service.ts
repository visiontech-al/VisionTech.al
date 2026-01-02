import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  projectUrl?: string;
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  serviceName: string;
  description: string;
  icon?: string;
  features: string[];
  createdAt: string;
}

export interface Demo {
  id: string;
  title: string;
  description: string;
  demoUrl?: string;
  thumbnailUrl?: string;
  category?: string;
  createdAt: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  serviceInterest?: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(`${this.apiUrl}/case-studies`);
  }

  getCaseStudy(id: string): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(`${this.apiUrl}/case-studies/${id}`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  getDemos(category?: string): Observable<Demo[]> {
    const url = category
      ? `${this.apiUrl}/demos?category=${category}`
      : `${this.apiUrl}/demos`;
    return this.http.get<Demo[]>(url);
  }

  getDemo(id: string): Observable<Demo> {
    return this.http.get<Demo>(`${this.apiUrl}/demos/${id}`);
  }

  submitContact(formData: ContactSubmission): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData);
  }
}

