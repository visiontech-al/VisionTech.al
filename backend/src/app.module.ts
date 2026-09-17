import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { databaseConfig } from './config/database.config';
import { ProjectsModule } from './modules/projects/projects.module';
import { CaseStudiesModule } from './modules/case-studies/case-studies.module';
import { ContactModule } from './modules/contact/contact.module';
import { DemosModule } from './modules/demos/demos.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig),
    // A single page view already costs 3-4 calls, so 10/min throttled real
    // browsing. Contact submissions get their own tighter limit on the route.
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    ProjectsModule,
    CaseStudiesModule,
    ContactModule,
    DemosModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

