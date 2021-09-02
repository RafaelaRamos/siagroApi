import { Modulo } from './Modulo.entity';
import { MODULO_REPOSITORY } from '../../core/constants';

export const postsProviders = [{
    provide: MODULO_REPOSITORY,
    useValue: Modulo,
}];