import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticlesTable1592180779244 implements MigrationInterface {
    name = 'CreateArticlesTable1592180779244';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "alias" character varying NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0c47f1f902db16254fae9f30952" UNIQUE ("alias"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }
}
