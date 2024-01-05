import { IBaseService } from '@/core/ibase.service';

import { Review } from '@reviews/services/models/review';
import { UserReview } from './models/user.review';

export interface IReviewsService extends IBaseService<Review> {
  findAReviewByIdUserByType(review: UserReview): Promise<UserReview>;
}
