import { DateType } from './date.type';
import { IDateTable } from './iDateTable';
import { IlogicalDelete } from './ilogicalDelete';

export abstract class EntityBase implements IlogicalDelete, IDateTable {
  isDeleted?: boolean;
  deleteDate?: DateType | null;
  creationDate?: DateType;
  updateDate?: DateType | null;
}
