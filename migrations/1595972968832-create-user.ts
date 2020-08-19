import { MigrationInterface, QueryRunner } from "typeorm";

export class createUser1595972968832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (\n\
           id        INT NOT NULL AUTO_INCREMENT,\n\
           bio       TEXT,\n\
           email     VARCHAR(255) NOT NULL,\n\
           image     TEXT,\n\
           password  VARCHAR(40) NOT NULL,\n\
           username  VARCHAR(40) NOT NULL,\n\
           createdAt DATETIME NOT NULL DEFAULT NOW(),\n\
           updatedAt DATETIME NOT NULL DEFAULT NOW(),\n\
           PRIMARY KEY(id),\n\
           UNIQUE(email),\n\
           UNIQUE(username)\n\
       );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user;`);
  }
}
