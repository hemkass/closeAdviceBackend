import { ReviewsService } from './../services/reviews.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { Request } from 'express';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewDTO } from './dtos/review.dto';
import { IReviewsService } from '../services/ireviews.service';
import { ArgumentRequireException } from '@/core/exceptions/argument.require.exception';
import { UserReview } from '../services/models/user.review';
import { ReviewNotFoundException } from '../exceptions/review.not.found.exception';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(ReviewsService) private reviewsService: IReviewsService,
  ) {}
  @ApiBody({
    type: ReviewDTO,
  })
  @ApiOperation({ summary: 'Create a new review' })
  @Post('/save')
  async create(@Body() review: ReviewDTO) {
    try {
      return await this.reviewsService.create(review);
    } catch (error) {
      if (error instanceof ArgumentRequireException) {
        throw new BadRequestException();
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'fetch a review by user and for a specific movie' })
  @Get('/:idMovie')
  async findAReviewByIdUserByType(
    @Req() request: Request,
    @Param('idMovie') idMovie: string,
  ): Promise<UserReview | void> {
    try {
      /*  return await this.reviewsService.findAReviewByIdUserByType(); */
    } catch (error) {
      console.error(error);
      if (error instanceof ReviewNotFoundException) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException();
    }
  }
}
