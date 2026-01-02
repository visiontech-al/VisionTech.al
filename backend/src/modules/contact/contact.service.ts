import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubmission, ContactStatus } from '../../entities/contact-submission.entity';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectRepository(ContactSubmission)
    private contactSubmissionsRepository: Repository<ContactSubmission>,
  ) {
    // Initialize nodemailer transporter (ready for configuration)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async create(
    createContactSubmissionDto: CreateContactSubmissionDto,
  ): Promise<ContactSubmission> {
    const submission = this.contactSubmissionsRepository.create({
      ...createContactSubmissionDto,
      status: ContactStatus.NEW,
    });

    const savedSubmission = await this.contactSubmissionsRepository.save(
      submission,
    );

    // Send email notification (if configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        await this.transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `New Contact Submission from ${createContactSubmissionDto.name}`,
          html: `
            <h2>New Contact Submission</h2>
            <p><strong>Name:</strong> ${createContactSubmissionDto.name}</p>
            <p><strong>Email:</strong> ${createContactSubmissionDto.email}</p>
            <p><strong>Company:</strong> ${createContactSubmissionDto.company || 'N/A'}</p>
            <p><strong>Service Interest:</strong> ${createContactSubmissionDto.serviceInterest || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${createContactSubmissionDto.message}</p>
          `,
        });
      } catch (error) {
        console.error('Failed to send email notification:', error);
        // Don't fail the request if email fails
      }
    }

    return savedSubmission;
  }
}

