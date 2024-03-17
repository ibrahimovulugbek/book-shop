import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignIn } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { Roles } from 'src/utility/enums/user-roles.enum';
import { AuthorizationGuard } from 'src/utility/guards/authorization.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/signup')
  async signup(
    @Body() userSignUp: UserSignUp
  ): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signUp(userSignUp) };
  }

  @Post('/signin')
  async signin(
    @Body() userSignIn: UserSignIn
  ): Promise<{
    user: UserEntity;
    accessToken: string;
  }> {
    const user = await this.usersService.signIn(userSignIn)
    const accessToken = await this.usersService.accessToken(user)
    return { user, accessToken }
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.USER, Roles.ADMIN]))
  @Get('/single/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Get('/all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.USER]))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() update: UpdateUserDto) {
    return this.usersService.update(id, update);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard([Roles.ADMIN]))
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('softDelete') softDelete: boolean
  ) {
    return await this.usersService.remove(id, softDelete);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/me')
  getProfile(
    @CurrentUser() currentUser: UserEntity
  ) {
    return currentUser;
  }

}
