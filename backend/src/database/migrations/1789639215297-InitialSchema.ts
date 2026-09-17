import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789639215297 implements MigrationInterface {
    name = 'InitialSchema1789639215297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Required for the uuid_generate_v4() defaults below
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "imageUrl" character varying(500), "technologies" text array NOT NULL DEFAULT '{}', "projectUrl" character varying(500), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "case_studies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientName" character varying(255) NOT NULL, "challenge" text NOT NULL, "solution" text NOT NULL, "results" text NOT NULL, "imageUrl" character varying(500), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18a30cb83a1df4d8df5ddc6b39e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "serviceName" character varying(255) NOT NULL, "description" text NOT NULL, "icon" character varying(100), "features" text array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contact_submissions_status_enum" AS ENUM('new', 'in_progress', 'resolved')`);
        await queryRunner.query(`CREATE TABLE "contact_submissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "company" character varying(255), "serviceInterest" character varying(255), "message" text NOT NULL, "status" "public"."contact_submissions_status_enum" NOT NULL DEFAULT 'new', "submittedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5b7b44e69fd5866a5769aeeb9d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "demos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "demoUrl" character varying(500), "thumbnailUrl" character varying(500), "category" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0918b73a3bd78c313e0e085f5c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demos"`);
        await queryRunner.query(`DROP TABLE "contact_submissions"`);
        await queryRunner.query(`DROP TYPE "public"."contact_submissions_status_enum"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "case_studies"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
