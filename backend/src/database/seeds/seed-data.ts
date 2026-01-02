import { Project } from '../../entities/project.entity';
import { CaseStudy } from '../../entities/case-study.entity';
import { Service } from '../../entities/service.entity';
import { Demo } from '../../entities/demo.entity';

export const seedProjects: Partial<Project>[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'A modern, scalable e-commerce platform built with Angular and NestJS. Features include real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Stripe API'],
    projectUrl: 'https://example.com/ecommerce',
  },
  {
    title: 'Financial Dashboard',
    description:
      'A comprehensive financial analytics dashboard for enterprise clients. Provides real-time market data, portfolio tracking, and advanced visualization tools.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    projectUrl: 'https://example.com/finance',
  },
  {
    title: 'Healthcare Management System',
    description:
      'A secure, HIPAA-compliant healthcare management system enabling patient scheduling, medical records management, and telemedicine capabilities.',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    technologies: ['Vue.js', 'NestJS', 'PostgreSQL', 'WebRTC'],
    projectUrl: 'https://example.com/healthcare',
  },
];

export const seedCaseStudies: Partial<CaseStudy>[] = [
  {
    clientName: 'TechCorp Solutions',
    challenge:
      'TechCorp needed a complete digital transformation of their legacy systems. Their existing infrastructure was outdated, slow, and vulnerable to security threats. They required a modern solution that could scale with their growing business while maintaining high security standards.',
    solution:
      'We developed a comprehensive microservices architecture using NestJS and Angular, implementing modern security protocols including OAuth 2.0, encrypted data storage, and regular security audits. We migrated their legacy data seamlessly and provided comprehensive training to their team.',
    results:
      'TechCorp experienced a 60% improvement in system performance, reduced security incidents by 95%, and increased customer satisfaction scores by 40%. The new system can now handle 10x more concurrent users without performance degradation.',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
  {
    clientName: 'SecureBank International',
    challenge:
      'SecureBank required a complete security overhaul of their banking application. They had experienced multiple security breaches and needed a comprehensive penetration testing and remediation solution.',
    solution:
      'Our cybersecurity team conducted thorough penetration testing, identified critical vulnerabilities, and implemented a multi-layered security approach including end-to-end encryption, advanced authentication mechanisms, and real-time threat monitoring.',
    results:
      'All identified vulnerabilities were patched within 48 hours. SecureBank achieved compliance with PCI DSS standards and ISO 27001 certification. Zero security incidents have been reported since implementation.',
    imageUrl:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
  },
];

export const seedServices: Partial<Service>[] = [
  {
    serviceName: 'Web & App Development',
    description:
      'We build modern, scalable web and mobile applications using cutting-edge technologies. From single-page applications to enterprise solutions, we deliver high-quality software that meets your business needs.',
    icon: 'code',
    features: [
      'Custom web applications',
      'Mobile app development',
      'Progressive Web Apps (PWA)',
      'API development',
      'Cloud deployment',
    ],
  },
  {
    serviceName: 'Cybersecurity Services',
    description:
      'Protect your digital assets with our comprehensive cybersecurity solutions. We offer vulnerability assessments, security audits, and proactive threat monitoring to keep your business safe.',
    icon: 'shield',
    features: [
      'Security audits',
      'Vulnerability assessments',
      'Threat monitoring',
      'Security consulting',
      'Compliance assistance',
    ],
  },
  {
    serviceName: 'Penetration Testing',
    description:
      'Our expert security professionals simulate real-world attacks to identify and address security weaknesses before malicious actors can exploit them.',
    icon: 'search',
    features: [
      'Network penetration testing',
      'Web application testing',
      'Mobile app security testing',
      'Social engineering assessments',
      'Detailed security reports',
    ],
  },
];

export const seedDemos: Partial<Demo>[] = [
  {
    title: 'E-Commerce Demo',
    description:
      'Explore our e-commerce platform demo featuring product catalog, shopping cart, and checkout flow.',
    demoUrl: 'https://demo.visiontech.al/ecommerce',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    category: 'E-Commerce',
  },
  {
    title: 'Dashboard Analytics',
    description:
      'Interactive dashboard showcasing real-time analytics and data visualization capabilities.',
    demoUrl: 'https://demo.visiontech.al/dashboard',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    category: 'Analytics',
  },
];

