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
       
        return await this.propriedadeService.findAll();
    }


    @Get(':id')
    async findAllByid(@Param('id') id: number) {
        return await this.propriedadeService.findAllId(id);
        
    }

   /* @Get(':id')
    async findOne(@Param('id') id: number): Promise<PropriedadeEntity> {
        
        const post = await this.propriedadeService.findOne(id);

       
        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        
        return post;
    }*/

   // @UseGuards(AuthGuard('jwt'))
  
    @Post()
    async create(@Body() propriedade:PropriedadeEntity): Promise<PropriedadeEntity> {
        
        return await this.propriedadeService.create(propriedade);
    }

   // @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() proprietario: PropriedadeDto, @Request() req): Promise<PropriedadeEntity> {
        
        const { numberOfAffectedRows, updatedPropriedade } = await this.propriedadeService.update(id, proprietario, req.user.id);

      
      
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

       
        return  updatedPropriedade;
    }

   // @UseGuards(AuthGuard('jwt'))
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
