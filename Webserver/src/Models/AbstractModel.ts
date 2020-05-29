import {PrimaryColumn, BeforeInsert, BaseEntity, Generated, Column} from 'typeorm';
import {v4 as uuid} from "uuid";
export abstract class AbstractModel extends BaseEntity{

    @PrimaryColumn()
    id: string;

    @Column()
    @Generated('increment')
    readable_id: number;

    @BeforeInsert()
    private beforeInsert() {
        this.id = uuid();
    }

}