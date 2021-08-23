import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { CreateModuleDto } from '../dto/create-module.dto';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { Module } from '../entities/module.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private modulesRepository: Repository<Module>,
  ) {}

  async create({ name, resume, course_id }: CreateModuleDto) {
    const module = this.modulesRepository.create({
      id: uuidV4(),
      name,
      resume,
      course_id,
    });

    return await this.modulesRepository.save(module);
  }

  async findAll() {
    return await this.modulesRepository.find();
  }

  async findById(id: string) {
    return await this.modulesRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.modulesRepository.findOne({ where: { name } });
  }

  async update(id: string, { name, resume }: UpdateModuleDto) {
    const module = await this.modulesRepository.findOne({ where: { id } });

    module.name = name;
    module.resume = resume;

    return await this.modulesRepository.save(module);
  }

  async remove(id: string) {
    await this.modulesRepository.delete({ id });

    return await this.findAll();
  }
}
