import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post('/')
  async create(@Body() create: CreateCategoryDto) {
    return await this.categoriesService.create(create);
  }

  @Get('/')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, update);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
