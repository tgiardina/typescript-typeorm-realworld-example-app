import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1595972968832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (\n\
           id        INT NOT NULL AUTO_INCREMENT,\n\
           joined    DATE NOT NULL,\n\
           lastLogin DATE NOT NULL,\n\
           username  VARCHAR(40) NOT NULL,\n\
           PRIMARY KEY(id),\n\
           UNIQUE(username)\n\
       );`
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user;`);
  }
}
