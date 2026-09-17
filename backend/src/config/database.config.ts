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
  // __dirname-relative so it resolves under ts-node (src/*.ts) and the compiled build (dist/*.js)
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  // Apply pending migrations on boot in production, where synchronize is off.
  // Without this the schema has to be migrated by hand on every deploy.
  migrationsRun: process.env.NODE_ENV !== 'development',
  logging: process.env.NODE_ENV === 'development',
};

