import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUp } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt'
import { UserSignIn } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async signUp(userSignUp: UserSignUp): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUp.email)
    if (userExists)
      throw new BadRequestException("Email is not available!")

    userSignUp.password = await hash(userSignUp.password, 10)
    let user = this.usersRepository.create(userSignUp);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user
  }

  async signIn(userSignIn: UserSignIn): Promise<UserEntity> {
    const userExists = await this.usersRepository.createQueryBuilder('users').addSelect('users.password')
      .where('users.email=:email', { email: userSignIn.email }).getOne()
    if (!userExists)
      throw new BadRequestException("Email is not available!")

    const matchPassword = await compare(userSignIn.password, userExists.password)
    if (!matchPassword)
      throw new BadRequestException("The password was entered incorrectly!")

    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException("User not found!")

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number, softDelete: boolean) {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user)
      throw new NotFoundException("User not found!");

    if (softDelete) {
      return await this.usersRepository.softDelete(id)
    } else {
      return await this.usersRepository.remove(user);
      // return await this.usersRepository.delete(id);
    }


    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }

  async accessToken(user: UserEntity) {
    return sign({ id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
  }

}
