import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubmission, ContactStatus } from '../../entities/contact-submission.entity';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService implements OnModuleInit {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;
  private smtpConfigured = false;

  constructor(
    @InjectRepository(ContactSubmission)
    private contactSubmissionsRepository: Repository<ContactSubmission>,
  ) {
    this.smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (this.smtpConfigured) {
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
  }

  async onModuleInit() {
    if (!this.smtpConfigured) {
      this.logger.warn('SMTP not configured — contact emails will not be sent. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env');
      return;
    }

    try {
      await this.transporter.verify();
      this.logger.log(`SMTP connection verified (host: ${process.env.SMTP_HOST}, user: ${process.env.SMTP_USER})`);
    } catch (error) {
      this.logger.error(`SMTP verification failed: ${error.message}`, error.stack);
    }
  }

  async create(
    createContactSubmissionDto: CreateContactSubmissionDto,
  ): Promise<ContactSubmission> {
    const submission = this.contactSubmissionsRepository.create({
      ...createContactSubmissionDto,
      status: ContactStatus.NEW,
    });

    const savedSubmission = await this.contactSubmissionsRepository.save(submission);

    if (this.smtpConfigured) {
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
        this.logger.log(`Contact email sent for submission from ${createContactSubmissionDto.email}`);
      } catch (error) {
        this.logger.error(`Failed to send contact email: ${error.message}`, error.stack);
        // Don't fail the request if email fails — submission is already saved
      }
    }

    return savedSubmission;
  }
}

