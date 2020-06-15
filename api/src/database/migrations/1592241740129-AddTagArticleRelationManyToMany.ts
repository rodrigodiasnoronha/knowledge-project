import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTagArticleRelationManyToMany1592241740129 implements MigrationInterface {
    name = 'AddTagArticleRelationManyToMany1592241740129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags_articles_articles" ("tagsId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_4a3f3c7b50261f684e36cbc7f53" PRIMARY KEY ("tagsId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9cde82be45586fa8795dda71b" ON "tags_articles_articles" ("tagsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d88b8d0e1656c425c6bfd66a9" ON "tags_articles_articles" ("articlesId") `);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_b9cde82be45586fa8795dda71b3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" ADD CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_9d88b8d0e1656c425c6bfd66a9d"`);
        await queryRunner.query(`ALTER TABLE "tags_articles_articles" DROP CONSTRAINT "FK_b9cde82be45586fa8795dda71b3"`);
        await queryRunner.query(`DROP INDEX "IDX_9d88b8d0e1656c425c6bfd66a9"`);
        await queryRunner.query(`DROP INDEX "IDX_b9cde82be45586fa8795dda71b"`);
        await queryRunner.query(`DROP TABLE "tags_articles_articles"`);
    }

}
