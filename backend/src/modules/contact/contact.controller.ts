import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Stricter than the global limit: submitting the form is a rare, costly
  // action (DB write + outbound email), so keep it spam-resistant.
  @Throttle({ default: { limit: 5, ttl: 600000 } })
  @Post()
  create(@Body() createContactSubmissionDto: CreateContactSubmissionDto) {
    return this.contactService.create(createContactSubmissionDto);
  }
}

