import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("User")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({unique: true})
  email: string;
  
  @Column()
  password: string;

  @Column()
  address: string;

  @Column("longtext")
  access_token: string;

  @Column("longtext")
  refresh_token: string;
}
