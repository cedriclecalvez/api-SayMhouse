import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { TicketEntity } from "../Ticket/entity";

@Entity("Message")
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column("longtext")
  contain: string;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.messages)
  ticket: TicketEntity[];
}
