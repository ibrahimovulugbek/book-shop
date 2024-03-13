import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(create: CreateCategoryDto) {
    const categoryExists = await this.categoryRepository.findOneBy({ title: create.title })
    if (categoryExists)
      throw new BadRequestException("Already exists!!!")

    const newCategory = this.categoryRepository.create(create)
    const createCategory = await this.categoryRepository.save(newCategory)

    return createCategory;
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const findCategory = await this.categoryRepository.findOneBy({ id })
    if (!findCategory)
      throw new NotFoundException("Category not found!!!")

    return findCategory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
