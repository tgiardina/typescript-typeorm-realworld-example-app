import { MigrationInterface, QueryRunner } from "typeorm";

export class createTag1599253845196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE tag (\n\
           id  INT NOT NULL AUTO_INCREMENT,\n\
           tag VARCHAR(40) NOT NULL, \n\
           createdAt   DATETIME NOT NULL DEFAULT NOW(),\n\
           updatedAt   DATETIME NOT NULL DEFAULT NOW(),\n\
           PRIMARY KEY(id),\n\
           UNIQUE(tag)\n\
       );`
    );
    await queryRunner.query(
      `CREATE TABLE article_tags_tag (\n\
           articleId INT NOT NULL,\n\
           tagId     INT NOT NULL,\n\
           PRIMARY KEY(articleId, tagId),\n\
           FOREIGN KEY(articleId) REFERENCES article(id),\n\
           FOREIGN KEY(tagId) REFERENCES tag(id)\n\
       );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tag;`);
    await queryRunner.query(`DROP TABLE article_tags_tag;`);
  }
}
