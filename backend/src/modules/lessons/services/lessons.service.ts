import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { Lesson } from '../entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async create({ name, resume, module_id }: CreateLessonDto) {
    const lesson = this.lessonsRepository.create({
      id: uuidV4(),
      name,
      resume,
      module_id,
    });

    return await this.lessonsRepository.save(lesson);
  }

  async findAll() {
    return await this.lessonsRepository.find();
  }

  async findById(id: string) {
    return await this.lessonsRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.lessonsRepository.findOne({ where: { name } });
  }

  async update(id: string, { name, resume }: UpdateLessonDto) {
    const lesson = await this.lessonsRepository.findOne({ where: { id } });

    lesson.name = name;
    lesson.resume = resume;

    return await this.lessonsRepository.save(lesson);
  }

  async remove(id: string) {
    await this.lessonsRepository.delete({ id });

    return await this.lessonsRepository.find();
  }
}
