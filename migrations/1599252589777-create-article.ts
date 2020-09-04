import { MigrationInterface, QueryRunner } from "typeorm";

export class createArticle1599252589777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE article (\n\
           id          INT NOT NULL AUTO_INCREMENT,\n\
           body        TEXT NOT NULL,\n\
           description TEXT NOT NULL,\n\
           slug        VARCHAR(40) NOT NULL,\n\
           title       VARCHAR(40) NOT NULL,\n\
           authorId    int NOT NULL,\n\
           createdAt   DATETIME NOT NULL DEFAULT NOW(),\n\
           updatedAt   DATETIME NOT NULL DEFAULT NOW(),\n\
           PRIMARY KEY(id),\n\
           FOREIGN KEY(authorId) REFERENCES user(id),\n\
           UNIQUE(slug)\n\
       );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE article;`);
  }
}
