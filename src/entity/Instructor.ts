import {
  Index,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  RelationId
} from "typeorm";
import { Course } from "./Course";

@Entity("Instructor")
export class Instructor {
  @Column("integer", {
    nullable: false,
    primary: true,
    name: "Id"
  })
  id: number;

  @Column("varchar", {
    nullable: false,
    name: "FullName"
  })
  fullName: string;

  @Column("varchar", {
    nullable: true,
    name: "FirstName"
  })
  firstName: string | null;

  @Column("varchar", {
    nullable: true,
    name: "LastName"
  })
  lastName: string | null;

  @Column("float", {
    nullable: true,
    name: "Rating"
  })
  rating: number | null;

  @Column("varchar", {
    nullable: true,
    name: "URL"
  })
  url: string | null;

  @Column("datetime", {
    nullable: true,
    name: "Timestamp"
  })
  timestamp: Date | null;

  @OneToMany(type => Course, Course => Course.instructor_)
  courses: Course[];
}
