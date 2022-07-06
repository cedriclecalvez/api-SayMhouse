import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Messages")
export  class MessageEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

  
}