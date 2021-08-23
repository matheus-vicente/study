import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HashProvider } from 'src/shared/providers/HashProvider/services/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashProvider: HashProvider,
  ) {}

  async create({ name, email, password, teacher }: CreateUserDto) {
    const hasedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      id: uuidV4(),
      name,
      email,
      teacher,
      password: hasedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findById(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, { name }: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    user.name = name;

    return await this.usersRepository.save(user);
  }

  async turnUserTeacher(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    user.teacher = true;

    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
