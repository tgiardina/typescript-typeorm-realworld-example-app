import { EntityRepository, Repository } from 'typeorm';

import { ITagRepository, ITagSeed } from './interfaces';
import { TagEntity } from './TagEntity';

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> implements ITagRepository {
  createAndSave(tag: ITagSeed): Promise<TagEntity> {
    return this.save(this.create(tag));
  }

  async findOrCreate(tag: ITagSeed): Promise<TagEntity> {
    const tagEntity = await this.findOne({ where: tag });
    if (!tagEntity) {
      return this.createAndSave(tag);
    } else {
      return tagEntity;
    }
  }
}
