/*

Table pet {

  pet_id UUID [pk]
  weight FLOAT [not null]
  pet_name VARCHAR(30) [not null]
  breed VARCHAR(30) [not null, default: 'unknow']
  status BOOLEAN [not null, default: true]

  owner UUID [not null]
  species_id UUID [not null]
  
}

*/

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pets extends BaseEntity {
  //pet_id UUID [pk]
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //weight FLOAT [not null]
  @Column("float", {
    nullable: false,
  })
  weight: number;

  //pet_name VARCHAR(30) [not null]
  @Column("varchar", {
    length: 30,
    nullable: false,
  })
  pet_name: string;

  //breed VARCHAR(30) [not null, default: 'unknow']
  @Column("varchar", {
    length: 30,
    nullable: false,
    default: "unknow",
  })
  breed: string;

  //status BOOLEAN [not null, default: true]
  @Column("boolean", {
    nullable: false,
    default: true,
  })
  status: boolean;

  //TODO: ADD RELATIONS FOREING KEYS WITH USER AND SPECIES
  //owner UUID [not null]
  //species_id UUID [not null]
}
