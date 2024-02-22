import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { LibrosModule } from '../libros/libros.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ AutoresModule, CategoriasModule, LibrosModule ]
})
export class SeedModule {}
