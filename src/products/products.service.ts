import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoriesService: CategoriesService
  ) { }

  async create(create: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
    const findCategory = await this.categoriesService.findOne(create.categoryId)
    const newProduct = this.productRepository.create(create);
    newProduct.category = findCategory;
    newProduct.addedBy = currentUser;
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: {
        addedBy: true,
        category: true
      },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
        category: {
          id: true,
          title: true,
        }
      }
    });

    if (!product)
      throw new NotFoundException("Product not found!!!")

    return product;
  }

  async update(id: number, update: Partial<UpdateProductDto>, currentUser: UserEntity): Promise<ProductEntity> {
    const findProduct = await this.productRepository.findOneBy({ id })
    if (!findProduct)
      throw new NotFoundException("Product not found!!!");
    Object.assign(findProduct, update)
    findProduct.addedBy = currentUser;

    if (update.categoryId) {
      const category = await this.categoriesService.findOne(update.categoryId)
      findProduct.category = category;
    }

    return await this.productRepository.save(findProduct);
  }

  async remove(id: number) {
    const findProduct = await this.productRepository.findOneBy({ id })
    if (!findProduct)
      throw new NotFoundException("Product not found!!!");

    return await this.productRepository.delete(id);
  }
}
