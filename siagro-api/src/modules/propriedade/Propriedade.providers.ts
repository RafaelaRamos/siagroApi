import { Propriedade } from './Propriedade.entity';
import { PROPRIEDADE_REPOSITORY } from '../../core/constants';

export const propriedadeProviders = [{
    provide: PROPRIEDADE_REPOSITORY,
    useValue: Propriedade,
}];
