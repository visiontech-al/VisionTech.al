import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demo } from '../../entities/demo.entity';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Injectable()
export class DemosService {
  constructor(
    @InjectRepository(Demo)
    private demosRepository: Repository<Demo>,
  ) {}

  async create(createDemoDto: CreateDemoDto): Promise<Demo> {
    const demo = this.demosRepository.create(createDemoDto);
    return await this.demosRepository.save(demo);
  }

  async findAll(category?: string): Promise<Demo[]> {
    if (category) {
      return await this.demosRepository.find({
        where: { category },
        order: { createdAt: 'DESC' },
      });
    }
    return await this.demosRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Demo> {
    const demo = await this.demosRepository.findOne({ where: { id } });
    if (!demo) {
      throw new NotFoundException(`Demo with ID ${id} not found`);
    }
    return demo;
  }

  async update(id: string, updateDemoDto: UpdateDemoDto): Promise<Demo> {
    const demo = await this.findOne(id);
    Object.assign(demo, updateDemoDto);
    return await this.demosRepository.save(demo);
  }

  async remove(id: string): Promise<void> {
    const demo = await this.findOne(id);
    await this.demosRepository.remove(demo);
  }
}

