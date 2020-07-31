import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?        : number;
  @Column()
  joined?    : Date;
  @Column()
  lastLogin? : Date;
  @Column()
  username   : string;
}
