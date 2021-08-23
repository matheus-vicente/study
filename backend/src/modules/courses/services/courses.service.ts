import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create({ name, description }: CreateCourseDto) {
    const course = this.coursesRepository.create({
      id: uuidV4(),
      name,
      description,
    });

    return await this.coursesRepository.save(course);
  }

  async findAll() {
    return await this.coursesRepository.find();
  }

  async findById(id: string) {
    return await this.coursesRepository.findOne({ where: { id } });
  }

  async findByNme(name: string) {
    return await this.coursesRepository.findOne({ where: { name } });
  }

  async update(id: string, { name, description }: UpdateCourseDto) {
    const course = await this.coursesRepository.findOne({ where: { id } });

    course.name = name;
    course.description = description;

    return await this.coursesRepository.save(course);
  }

  async remove(id: string) {
    await this.coursesRepository.delete({ id });

    return this.coursesRepository.find();
  }
}
