import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PropriedadeService } from './propriedade.service';
import { Propriedade as PropriedadeEntity } from './Propriedade.entity';
import { PropriedadeDto } from '../propriedade/Propriedade.dto';

@Controller('propriedade')
export class PropriedadeController {
    constructor(private readonly propriedadeService: PropriedadeService) { }

    @Get()
    async findAll() {
        // get all posts in the db
        return await this.propriedadeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PropriedadeEntity> {
        // find the post with this id
        const post = await this.propriedadeService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // if post exist, return the post
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() propriedade:PropriedadeEntity , @Request() req): Promise<PropriedadeEntity> {
        // create a new post and return the newly created post
        return await this.propriedadeService.create(propriedade, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() proprietario: PropriedadeDto, @Request() req): Promise<PropriedadeEntity> {
        // get the number of row affected and the updated post
        const { numberOfAffectedRows, updatedPropriedade } = await this.propriedadeService.update(id, proprietario, req.user.id);

        // if the number of row affected is zero, 
        // it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return the updated post
        return  updatedPropriedade;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the post with this id
        const deleted = await this.propriedadeService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
