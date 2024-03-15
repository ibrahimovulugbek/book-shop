import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductsService
  ) { }

  async create(create: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const product = await this.productService.findOne(create.productId);
    let review = await this.findByUserAndProduct(currentUser.id, create.productId);
    if (!review) {
      review = this.reviewRepository.create(create)
      review.product = product
      review.user = currentUser;
    } else {
      review.comment = create.comment;
      review.ratings = create.ratings
    }
    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    })
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async findByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId
        },
        product: {
          id: productId
        }
      },
      relations: {
        user: true,
        product: {
          category: true
        }
      }
    })
  }

}
