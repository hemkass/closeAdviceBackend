import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { Review } from './models/review';
import { BaseService } from '@/core/base.service';
import { IReviewsService } from './ireviews.service';
import { ReviewsRepository } from '../repositories/reviews.repository';
import { IReviewsRepository } from '../repositories/ireviews.repository';
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { ReviewNotCreatedException } from '../exceptions/review.not.created.exception';
import { UserReview } from './models/user.review';

@Injectable()
export class ReviewsService
  extends BaseService<Review>
  implements IReviewsService
{
  constructor(
    @Inject(ReviewsRepository)
    private reviewsRepository: IReviewsRepository,
  ) {
    super(reviewsRepository);
  }

  async create(review: Review): Promise<Review> {
    // idIMBD must to be unique
    if (!review?.idUser || !review?.idMovie) {
      throw new ArgumentRequireException('IdMovie and IdUser required');
    }

    const newReview = await this.reviewsRepository.create(review);

    if (!newReview?.id) {
      throw new ReviewNotCreatedException('not created');
    }

    await this.reviewsRepository.linkCommentUser({
      idMovie: review.idMovie,
      idUser: review.idUser,
      idReview: newReview.id,
    });
    return newReview;
  }

  async getById(idUser: number): Promise<Review> {
    return super.getById(idUser);
  }

  getAll(): Promise<Review[]> {
    return super.getAll();
  }

  delete(id: number): Promise<void> {
    return this.reviewsRepository.delete(id);
  }
  update(entity: Partial<Review>): Promise<Review> {
    return this.reviewsRepository.update(entity);
  }
  exist(id: number): Promise<boolean> {
    throw new NotImplementedException('Method not implemented.');
  }

  async findAReviewByIdUserByType(review: UserReview): Promise<UserReview> {
    // !idMovie will to be updated by intersection when implementing series and book
    if (!review?.idUser || !review?.idMovie) {
      throw new ArgumentRequireException('IdUser and IdMovie required');
    }
    return this.reviewsRepository.findAReviewByIdUserByType(review);
  }
}
