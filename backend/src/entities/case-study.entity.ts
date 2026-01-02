import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('case_studies')
export class CaseStudy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  clientName: string;

  @Column({ type: 'text' })
  challenge: string;

  @Column({ type: 'text' })
  solution: string;

  @Column({ type: 'text' })
  results: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

