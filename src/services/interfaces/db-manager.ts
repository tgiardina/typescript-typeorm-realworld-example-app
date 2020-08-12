import { BaseEntity } from 'typeorm';

export interface IDbManager {
  save: (model: BaseEntity) => Promise<BaseEntity>;
  findOne: (table: typeof BaseEntity, id: number) => BaseEntity;
}
