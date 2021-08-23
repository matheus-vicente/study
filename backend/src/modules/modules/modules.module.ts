import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Module as EntityModule } from './entities/module.entity';
import { ModulesService } from './services/modules.service';
import { ModulesController } from './controllers/modules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EntityModule])],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
