import { Module } from '@nestjs/common';
import { PropriedadeService } from './propriedade.service';
import { PropriedadeController } from './propriedade.controller';
import { propriedadeProviders } from './Propriedade.providers';

@Module({
    providers: [PropriedadeService, ...propriedadeProviders],
    controllers: [PropriedadeController],
})
export class PropriedadeModule { }