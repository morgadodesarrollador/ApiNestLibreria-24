import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('libros')
//@UseGuards(AuthGuard('jwt'))
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.librosService.create(createLibroDto);
  }

  @Get()
  findAll() {
    return this.librosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') isbn: string) {
    return this.librosService.findOne(isbn);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.librosService.update(+id, updateLibroDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.librosService.remove(+id);
  }
}
