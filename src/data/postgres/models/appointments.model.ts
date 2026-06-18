/*
Table appointment{

  appointment_id UUID [pk]
  status appointmentStatus [default: 'pending']
  date DATETIME [not null]
  //tipo text puede agregar mas de 255 caracteres
  reason TEXT [not null]

  user_id UUID [not null]
  pet_id UUID [not null]


  created_at DATETIME [default: 'now']
}
*/

export enum AppointmentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./user.model.js";
import { Pets } from "./pets.model.js";

@Entity()
export class Appointments extends BaseEntity {
  //appointment_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  appointment_id: string;

  //status appointmentStatus [default: 'pending']
  @Column("enum", {
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
    nullable: false,
  })
  status: AppointmentStatus;

  //date DATETIME [not null]
  @Column("timestamp", {
    nullable: false,
  })
  date: Date;

  //tipo text puede agregar mas de 255 caracteres
  //reason TEXT [not null]
  @Column("text", {
    nullable: false,
  })
  reason: string;

  //user_id UUID [not null]
  //pet_id UUID [not null]
  //created_at DATETIME [default: 'now']
  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.appointment)
  @JoinColumn({ name: "doctor_user_id" })
  user: Relation<User>;

  @ManyToOne(() => Pets, (pet) => pet.appointment)
  @JoinColumn({ name: "pet_id" })
  pet: Relation<Pets>;
}
