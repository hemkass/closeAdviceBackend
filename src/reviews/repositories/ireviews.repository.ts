import { IBaseRepository } from '@/core/ibase.repository';
import { Review } from '@reviews/services/models/review';
import { UserReview } from '../services/models/user.review';

export interface IReviewsRepository extends IBaseRepository<Review> {
  linkCommentUser(data: {
    idUser: number;
    idMovie: number;
    idReview: number;
  }): Promise<void>;
  findAReviewByIdUserByType(review: UserReview): Promise<UserReview>;
}
