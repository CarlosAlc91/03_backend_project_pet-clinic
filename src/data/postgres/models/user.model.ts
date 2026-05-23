//Here we'll be creating the user model entitie from dbdiagram.io

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  DOCTOR = "doctor",
}
/**
 * Table user {

  user_id UUID [pk]
  full_name VARCHAR(70) [not null]
  password VARCHAR(255) [not null]
  email VARCHAR(50) [not null, unique]
  phone_number VARCHAR(20) [not null, unique]
  role user_role [default: 'user', not null]
  //por defecto va a estar desactivado
  status BOOLEAN [default: false, not null]

  //creado ahora
  created_at timestamp [default: 'now()']
}
 */

@Entity()
//To create an entity
//first create an export class
//BaseEntity is from typeorm
export class User extends BaseEntity {
  //user_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //full_name VARCHAR(70) [not null]
  @Column("varchar", {
    length: 70,
    //in here we use false, because we're declarating not null
    nullable: false,
  })
  fullname: string;

  //password VARCHAR(255) [not null]
  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  password: string;

  //email VARCHAR(50) [not null, unique]
  @Column("varchar", {
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  //phone_number VARCHAR(20) [not null, unique]
  @Column("varchar", {
    length: 20,
    nullable: false,
    unique: true,
  })
  phone_number: string;

  //role user_role [default: 'user']
  @Column("enum", {
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  //status BOOLEAN [default: false, not null]
  @Column("boolean", {
    default: false,
    nullable: false,
  })
  status: boolean;

  //created_at timestamp [default: 'now()']
  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at: Date;
}
