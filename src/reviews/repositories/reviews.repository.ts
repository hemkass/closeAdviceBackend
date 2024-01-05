//core
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/core/base.repository';

// services and repo
import { IReviewsRepository } from '@reviews/repositories/ireviews.repository';
import { PrismaService } from '@/prisma/prisma.service';

// exceptions
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { ReviewNotCreatedException } from '@reviews/exceptions/review.not.created.exception';
import { ReviewNotFoundException } from '@reviews/exceptions/review.not.found.exception';

//models
import { Review } from '@reviews/services/models/review';
import { UserReview } from '../services/models/user.review';

@Injectable()
export class ReviewsRepository
  extends BaseRepository<Review>
  implements IReviewsRepository
{
  constructor(private prisma: PrismaService) {
    super(prisma.review);
  }
  getAll(): Promise<Review[]> {
    return super.getAll({ where: { isDeleted: false } });
  }
  getById(id: number): Promise<Review> {
    return super.findById(id, ReviewNotFoundException);
  }

  async create(review: Review): Promise<Review> {
    const newReview = await this.prisma.review.create({ data: review });

    if (!newReview?.id) {
      throw new ReviewNotCreatedException('review not created');
    }
    return newReview;
  }

  async exist(idreview: number): Promise<boolean> {
    const review = await this.prisma.review.count({
      where: { AND: { id: idreview, isDeleted: false } },
    });
    return review === 1;
  }

  async update(data: Partial<Review>): Promise<Review> {
    if (!data?.id) {
      throw new ArgumentRequireException(`Id mandatory`);
    }
    data.updateDate = new Date();
    const review = await this.prisma.review.update({
      where: { id: data.id },
      data: data,
    });

    if (!review?.id || review?.isDeleted) {
      throw new ReviewNotFoundException(`User ${data.id} not found`);
    } else {
      return review;
    }
  }

  async delete(idreview: number): Promise<void> {
    await this.prisma.review.update({
      where: { id: idreview },
      data: { updateDate: new Date(), deleteDate: new Date(), isDeleted: true },
    });
  }
  async linkCommentUser(data: {
    idUser: number;
    idMovie: number;
    idReview: number;
  }): Promise<void> {
    await this.prisma.user_review.create({
      data: data,
    });
  }
  async findAReviewByIdUserByType(review: UserReview): Promise<UserReview> {
    const userReview = await this.prisma.user_review.findFirst({
      where: {
        AND: {
          idUser: review.idUser,
          review: { idMovie: review.idReview },
        },
      },
      include: { review: true },
    });
    if (!userReview) {
      throw new ReviewNotFoundException(
        `No review founded for these date ${review}`,
      );
    }
    return userReview;
  }
}
