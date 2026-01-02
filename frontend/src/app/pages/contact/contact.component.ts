import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;

  serviceInterests = [
    'Web & App Development',
    'Cybersecurity Services',
    'Penetration Testing',
    'Consulting',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      serviceInterest: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = null;
      this.submitSuccess = false;

      this.apiService.submitContact(this.contactForm.value).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.contactForm.reset();
          this.isSubmitting = false;
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          this.submitError = 'Failed to send message. Please try again later.';
          this.isSubmitting = false;
          console.error('Contact form error:', error);
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field?.hasError('email') && field?.touched) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength') && field?.touched) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${minLength} characters`;
    }
    return null;
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      serviceInterest: 'Service Interest',
      message: 'Message',
    };
    return labels[fieldName] || fieldName;
  }
}

