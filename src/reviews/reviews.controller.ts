import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/enums/user-roles.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(AuthenticationGuard)
  @Post('/')
  async create(
    @Body() create: CreateReviewDto,
    @CurrentUser() currentUser: UserEntity
  ): Promise<ReviewEntity> {
    return await this.reviewsService.create(create, currentUser);
  }

  @Get('/')
  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewsService.findAll();
  }

  @Get('/productId')
  async findAllByProduct(
    @Body('productId', ParseIntPipe) productId: number
  ): Promise<ReviewEntity[]> {
    return await this.reviewsService.findAllByProduct(productId);
  }

  @Get('/single/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ReviewEntity> {
    return await this.reviewsService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateReviewDto
  ) {
    return this.reviewsService.update(id, update);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Delete('/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.remove(id);
  }
}
