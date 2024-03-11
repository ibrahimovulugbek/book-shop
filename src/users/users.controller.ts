import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignIn } from './dto/user-signin.dto';

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

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
