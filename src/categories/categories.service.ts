import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(create: CreateCategoryDto, currentUser: UserEntity): Promise<CategoryEntity> {
    const categoryExists = await this.categoryRepository.findOneBy({ title: create.title })
    if (categoryExists)
      throw new BadRequestException("Already exists!!!")

    const newCategory = this.categoryRepository.create(create)
    newCategory.addedBy = currentUser;
    const createCategory = await this.categoryRepository.save(newCategory)

    return createCategory;
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const findCategory = await this.categoryRepository.findOne(
      {
        where: { id: id },
        relations: { addedBy: true },
        select: {
          addedBy: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    )
    if (!findCategory)
      throw new NotFoundException("Category not found!!!")

    return findCategory;
  }

  async update(id: number, update: Partial<UpdateCategoryDto>): Promise<CategoryEntity> {

    const findCategory = await this.categoryRepository.findOneBy({ id })
    if (!findCategory)
      throw new NotFoundException("Category not found!!!")

    Object.assign(findCategory, update);
    return this.categoryRepository.save(findCategory);
  }

  async remove(id: number) {
    const findCategory = await this.categoryRepository.findOneBy({ id })
    if (!findCategory)
      throw new NotFoundException("Category not found!!!")

    return await this.categoryRepository.delete(id)
  }

}
