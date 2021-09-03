import { Injectable, Inject } from '@nestjs/common';
import { Propriedade } from './Propriedade.entity';
import { PropriedadeDto } from '../propriedade/Propriedade.dto';
import { User } from '../users/user.entity';
import {PROPRIEDADE_REPOSITORY } from '../../core/constants';

@Injectable()
export class PropriedadeService {
    constructor(@Inject(PROPRIEDADE_REPOSITORY) private readonly propriedadeRepository: typeof Propriedade) { }

    async create(propriedade: Propriedade): Promise<Propriedade> {
        return await this.propriedadeRepository.create<Propriedade>(propriedade);
    }

    async findAll(): Promise<Propriedade[]> {
        return await this.propriedadeRepository.findAll<Propriedade>({
        	include: [{ model: User, attributes: { exclude: ['password'] } }],
    	});
    }
    async findAllId(userId): Promise<Propriedade[]> {
        return await this.propriedadeRepository.findAll<Propriedade>({
            where: {  userId },
    	});
    }



    async findOne(id): Promise<Propriedade> {
        return await this.propriedadeRepository.findOne({
        	where: { id },
        	include: [{ model: User, attributes: { exclude: ['password'] } }],
    	});
    }



    async delete(id, userId) {
        return await this.propriedadeRepository.destroy({ where: { id, userId } });
    }

    async update(id, data, userId) {
        const [numberOfAffectedRows, [updatedPropriedade]] = await this.propriedadeRepository.update({ ...data }, { where: { id, userId }, returning: true });

        return { numberOfAffectedRows, updatedPropriedade };
    }
}
