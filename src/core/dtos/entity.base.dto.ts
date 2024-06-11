import { Expose } from 'class-transformer';

export class EntityBaseDTO {
  @Expose()
  isDeleted?: boolean;

  @Expose()
  deleteDate?: Date | null;

  @Expose()
  updateDate?: Date | null;

  @Expose()
  creationDate?: Date;
}
