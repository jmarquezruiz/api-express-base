import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ejemplo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "int", default: 0 })
    number: number;
}