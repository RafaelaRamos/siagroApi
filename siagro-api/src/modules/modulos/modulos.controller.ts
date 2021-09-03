import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModulosService } from './modulos.service';
import { Modulo, Modulo as ModuloEntity } from './Modulo.entity';
import { ModuloDto } from './Modulo.dto';

@Controller('posts')
export class ModuloController {
    constructor(private readonly moduloService: ModulosService) { }

    @Get()
    async findAll() {
       
        return await this.moduloService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ModuloEntity> {
      
        const modulo = await this.moduloService.findOne(id);

       
        if (!modulo) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        
        return modulo;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() modulo: Modulo, @Request() req): Promise<ModuloEntity> {
       
        return await this.moduloService.create(modulo, req.propriedade.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() modulo: ModuloDto, @Request() req): Promise<ModuloEntity> {
       
        const { numberOfAffectedRows, updatedPost } = await this.moduloService.update(id, modulo, req.propriedade.id);

       
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

       
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
       
        const deleted = await this.moduloService.delete(id, req.user.id);

        
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

       
        return 'Successfully deleted';
    }
}

