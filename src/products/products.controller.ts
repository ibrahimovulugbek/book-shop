import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/enums/user-roles.enum';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Post('/')
  async create(
    @Body() create: CreateProductDto,
    @CurrentUser() CurrentUser: UserEntity
  ): Promise<ProductEntity> {
    return await this.productsService.create(create, CurrentUser);
  }

  @Get('/')
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductEntity> {
    return await this.productsService.findOne(id);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: UpdateProductDto,
    @CurrentUser() currentUser: UserEntity
  ): Promise<ProductEntity> {
    return await this.productsService.update(id, update, currentUser);
  }

  @Delete('/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.productsService.remove(+id);
  }
}
