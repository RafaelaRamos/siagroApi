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
        // get all posts in the db
        return await this.moduloService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ModuloEntity> {
        // find the post with this id
        const modulo = await this.moduloService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!modulo) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return modulo;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() modulo: Modulo, @Request() req): Promise<ModuloEntity> {
        // create a new post and return the newly created post
        return await this.moduloService.create(modulo, req.propriedade.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() modulo: ModuloDto, @Request() req): Promise<ModuloEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPost } = await this.moduloService.update(id, modulo, req.propriedade.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.moduloService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
