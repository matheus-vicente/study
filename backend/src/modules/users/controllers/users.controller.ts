import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserCredentials: CreateUserDto) {
    return await this.usersService.create(createUserCredentials);
  }

  @Get()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async turnUserTeacher(@Param('id') id: string) {
    return await this.usersService.turnUserTeacher(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id')
    id: string,
    @Body()
    updateUserCredentials: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserCredentials);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
