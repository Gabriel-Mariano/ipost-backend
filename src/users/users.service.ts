import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersPrismaRepository } from './repositories/user.prisma.repository';
import { hash } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prismaUser:UsersPrismaRepository){}
  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    
    const userAlreadyExists = await this.prismaUser.findOne(email);

    if(userAlreadyExists) {
      throw new HttpException({
        message:'Usuário já existente 😑 .'
      }, HttpStatus.FORBIDDEN)
    }

    const saltOrRounds = 10;
    const passwordHash = await hash(password, saltOrRounds);

    const userData = {
      name,
      email,
      password:passwordHash
    }

    const user = new User(userData);

    await this.prismaUser.execute(user);

    return user;
  }

  async findAll() {
    const users = await this.prismaUser.findAll()

    const usersDataFilteredWithoutPassword = users.map((user:User)=> {
      return {
        id:user.id,
        name:user.name,
        email:user.email,
        avatar:user.avatar 
      }
    })
    
    return usersDataFilteredWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.prismaUser.findById(id);

    if(user) {
      const { password, ...result } = user;

      return result;
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
