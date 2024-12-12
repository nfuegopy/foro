/*eslint-disable prettier/prettier  */
import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user_ranks')
export class Rangos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    rank_name:string;

    @Column()
    min_posts: number;

    
    @Column()
    max_posts: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}