import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseStudy } from '../../entities/case-study.entity';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';

@Injectable()
export class CaseStudiesService {
  constructor(
    @InjectRepository(CaseStudy)
    private caseStudiesRepository: Repository<CaseStudy>,
  ) {}

  async create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudy> {
    const caseStudy = this.caseStudiesRepository.create(createCaseStudyDto);
    return await this.caseStudiesRepository.save(caseStudy);
  }

  async findAll(): Promise<CaseStudy[]> {
    return await this.caseStudiesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<CaseStudy> {
    const caseStudy = await this.caseStudiesRepository.findOne({
      where: { id },
    });
    if (!caseStudy) {
      throw new NotFoundException(`Case study with ID ${id} not found`);
    }
    return caseStudy;
  }

  async update(
    id: string,
    updateCaseStudyDto: UpdateCaseStudyDto,
  ): Promise<CaseStudy> {
    const caseStudy = await this.findOne(id);
    Object.assign(caseStudy, updateCaseStudyDto);
    return await this.caseStudiesRepository.save(caseStudy);
  }

  async remove(id: string): Promise<void> {
    const caseStudy = await this.findOne(id);
    await this.caseStudiesRepository.remove(caseStudy);
  }
}

