import { EntityRepository, Repository } from 'typeorm';

import { ITagRepository, ITagRo } from './interfaces';
import { TagEntity } from './TagEntity';

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> implements ITagRepository {
  createAndSave(tag: ITagRo): Promise<TagEntity> {
    return this.save(this.create(tag));
  }

  async findOrCreate(tag: ITagRo): Promise<TagEntity> {
    const tagEntity = await this.findOne({ where: tag });
    if (!tagEntity) {
      return this.createAndSave(tag);
    } else {
      return tagEntity;
    }
  }
}
