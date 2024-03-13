import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/enums/user-roles.enum';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Post('/')
  async create(
    @Body() create: CreateCategoryDto,
    @CurrentUser() currentUser: UserEntity
  ): Promise<CategoryEntity> {
    return await this.categoriesService.create(create, currentUser);
  }

  @Get('/')
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryEntity> {
    return await this.categoriesService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    return await this.categoriesService.update(id, update);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.remove(id);
  }
}
