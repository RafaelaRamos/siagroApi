import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModuloController } from './modulos.controller';
import { postsProviders } from './Modulo.providers';

@Module({
    providers: [ModulosService, ...postsProviders],
    controllers: [ModuloController],
})
export class PostsModule { }