import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Project } from '../entities/project.entity';
import { CaseStudy } from '../entities/case-study.entity';
import { Service } from '../entities/service.entity';
import { ContactSubmission } from '../entities/contact-submission.entity';
import { Demo } from '../entities/demo.entity';

config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'visiontech',
  entities: [Project, CaseStudy, Service, ContactSubmission, Demo],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};

