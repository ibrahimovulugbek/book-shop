import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUp } from './dto/user-signup.dto';
import { compare, hash } from 'bcrypt'
import { UserSignIn } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { Status } from 'src/utility/enums/user-status.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async signUp(userSignUp: UserSignUp): Promise<UserEntity> {
    const userExists = await this.usersRepository.findOneBy({ email: userSignUp.email })
    if (userExists)
      throw new BadRequestException("Email is not available!")

    userSignUp.password = await hash(userSignUp.password, 10)
    const user = this.usersRepository.create(userSignUp);
    const savedUser = await this.usersRepository.save(user);
    delete savedUser.password;
    return savedUser;
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  /**
 * id va softDelete kirib keladi 
 * softDelete defolt holatda true boladi
 * deletedAt va status degan propertysi bo'ladi
 * user o'chirilganda (softdelete=true) deletedAt ga o'chirilgan sana, statusga deleted degan status joylashtiriladi
 * user o'chirilganda (softdelete=false) user butunlay o'chirib yuboriladi 
 * 
 */
  async remove(id: number, softDelete: boolean) {
    if (softDelete == null) softDelete = true
    const user = await this.usersRepository.findOneBy({ id })
    if (!user)
      throw new NotFoundException("User not found!");

    if (softDelete) {
      user.deletedAt = new Date()
      user.status = Status.PASSIVE
      return user;
    } else {
      console.log("ishladi!")
      return await this.usersRepository.remove(user);
    }
  }

  async accessToken(user: UserEntity) {
    return sign({ id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
  }

}
