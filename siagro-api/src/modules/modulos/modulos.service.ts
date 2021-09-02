import { Injectable, Inject } from '@nestjs/common';
import { Modulo } from './Modulo.entity';
import { MODULO_REPOSITORY } from '../../core/constants';

@Injectable()
export class ModulosService {
    constructor(@Inject(MODULO_REPOSITORY) private readonly moduloRepository: typeof Modulo) { }

    async create(modulo: Modulo,  propriedadeId): Promise<Modulo> {
        return await this. moduloRepository.create<Modulo>(modulo, propriedadeId);
    }

    async findAll(): Promise<Modulo[]> {
        return await this. moduloRepository.findAll<Modulo>({
        	include: [{ model: Modulo }],
    	});
    }

    async findOne(id): Promise<Modulo> {
        return await this. moduloRepository.findOne({
        	where: { id },
        	include: [{ model: Modulo }],
    	});
    }

    async delete(id, propriedadeId) {
        return await this. moduloRepository.destroy({ where: { id, propriedadeId } });
    }

    async update(id, data, propriedadeId) {
        const [numberOfAffectedRows, [updatedPost]] = await this. moduloRepository.update({ ...data }, { where: { id, propriedadeId }, returning: true });

        return { numberOfAffectedRows, updatedPost };
    }
}
