import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity("Ticket")
export  class TicketEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    isProcessing: boolean;
  
}