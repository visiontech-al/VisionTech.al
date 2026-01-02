import { AppDataSource } from '../../config/data-source';
import {
  seedProjects,
  seedCaseStudies,
  seedServices,
  seedDemos,
} from './seed-data';
import { Project } from '../../entities/project.entity';
import { CaseStudy } from '../../entities/case-study.entity';
import { Service } from '../../entities/service.entity';
import { Demo } from '../../entities/demo.entity';

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const projectRepository = AppDataSource.getRepository(Project);
    const caseStudyRepository = AppDataSource.getRepository(CaseStudy);
    const serviceRepository = AppDataSource.getRepository(Service);
    const demoRepository = AppDataSource.getRepository(Demo);

    // Check if data already exists
    const existingProjects = await projectRepository.count();
    const existingCaseStudies = await caseStudyRepository.count();
    const existingServices = await serviceRepository.count();
    const existingDemos = await demoRepository.count();

    if (existingProjects === 0) {
      await projectRepository.save(seedProjects);
      console.log('✅ Seeded projects');
    } else {
      console.log('ℹ️  Projects already exist, skipping');
    }

    if (existingCaseStudies === 0) {
      await caseStudyRepository.save(seedCaseStudies);
      console.log('✅ Seeded case studies');
    } else {
      console.log('ℹ️  Case studies already exist, skipping');
    }

    if (existingServices === 0) {
      await serviceRepository.save(seedServices);
      console.log('✅ Seeded services');
    } else {
      console.log('ℹ️  Services already exist, skipping');
    }

    if (existingDemos === 0) {
      await demoRepository.save(seedDemos);
      console.log('✅ Seeded demos');
    } else {
      console.log('ℹ️  Demos already exist, skipping');
    }

    console.log('✨ Seeding completed successfully');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

runSeeds();

