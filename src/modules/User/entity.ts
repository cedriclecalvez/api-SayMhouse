import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("Users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;
}
