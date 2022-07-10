import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { TicketEntity } from "../Ticket/entity";
import { userType } from "../types/entities.type";

@Entity("User")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column("longtext")
  access_token: string;

  @Column("longtext")
  refresh_token: string;

  @ManyToMany(() => TicketEntity, (ticket: { users: userType }) => ticket.users)
  tickets: TicketEntity[];

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity[];
}

@Entity("Role")
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameRole: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
