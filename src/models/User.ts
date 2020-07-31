import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?       : number;
  @Column()
  joined    : Date;
  @Column()
  lastLogin : Date;
  @Column()
  username  : string;
  @CreateDateColumn()
  createdAt : Date;
  @UpdateDateColumn()
  updatedAt : Date;  
}
