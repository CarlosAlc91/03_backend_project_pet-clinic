/*
Table species {

  species_id UUID [pk]
  species_name VARCHAR(30) [not null]
}
*/

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Species extends BaseEntity {
  //species_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  species_id: string;

  //species_name VARCHAR(30) [not null]
  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  species_name: string;
}
