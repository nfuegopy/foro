/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    url: string;
    @Column()
    uploaded_by: number;
    
    @CreateDateColumn()
    created_at: Date;
}