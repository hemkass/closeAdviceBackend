import { PFSException } from '@/core/exceptions/PFSException';

export class UserNotCreatedException extends PFSException {
  constructor(message: string) {
    super(message);
  }
}
