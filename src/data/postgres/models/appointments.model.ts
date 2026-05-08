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
  Pending,
  Completed,
  Cancelled,
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Appointments extends BaseEntity {
  //appointment_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  appointment: string;

  //status appointmentStatus [default: 'pending']
  @Column("enum", {
    default: AppointmentStatus.Pending,
  })
  status: AppointmentStatus;

  //date DATETIME [not null]
  @Column("date", {
    nullable: false,
  })
  date: number;

  //tipo text puede agregar mas de 255 caracteres
  //reason TEXT [not null]
  @Column("text", {
    nullable: false,
  })
  reson: string;

  //user_id UUID [not null]
  //pet_id UUID [not null]
  //created_at DATETIME [default: 'now']
  @Column("date", {
    default: "now",
  })
  created_at: number;
}
