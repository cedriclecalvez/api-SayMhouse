import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Rooms")
export  class RoomEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

  
}