import {CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {AbstractModel} from './AbstractModel';

export abstract class WithTimeStamps extends AbstractModel{
    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string
}