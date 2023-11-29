import { Inject, Injectable } from '@nestjs/common';
import { IGenresService } from './igenres.service';

@Injectable()
export class GenresService implements IGenresService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {
    super(usersRepository);
  }
}
