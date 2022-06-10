import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("Users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column("longtext")
  access_token: string;

  @Column("longtext")
  refresh_token: string;
}
