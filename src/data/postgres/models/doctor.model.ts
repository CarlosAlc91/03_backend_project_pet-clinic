/*
Table doctor{
  doctor_id UUID [pk]
  speciality VARCHAR(30) [not null]
  user_id VARCAHR [not null]
}

*/

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.model.js";

@Entity()
export class Doctor extends BaseEntity {
  //doctor_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  vet_name: string;

  //speciality VARCHAR(30) [not null]
  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  speciality: string;

  //TODO: ADD RELATIONS FOREING KEYS WITH USER
  //user_id VARCAHR [not null]

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
