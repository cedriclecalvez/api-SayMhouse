import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { ticketType } from "../types/entities.type";
import { UserEntity } from "../User/entity";
import { MessageEntity } from "../Message/entity";

@Entity("Ticket")
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isProcessing: boolean;

  @ManyToMany(() => UserEntity, (user: { tickets: ticketType }) => user.tickets)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.ticket)
  messages: MessageEntity[];
}
