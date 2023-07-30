import { IDateTable } from './iDateTable';
import { IlogicalDelete } from './ilogicalDelete';

export abstract class EntityBase implements IlogicalDelete, IDateTable {
  isDeleted?: boolean;
  deleteDate?: string | null | Date;
  creationDate?: string | null | Date;
  updateDate?: string | null | Date;
}