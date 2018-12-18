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
import { Instructor } from "./Instructor";

@Entity("Course")
export class Course {
    @Column("integer", {
        nullable: false,
        primary: true,
        name: "Id"
    })
    id: number;

    @Column("varchar", {
        nullable: false,
        name: "Name"
    })
    name: string;

    @Column("varchar", {
        nullable: false,
        name: "Number"
    })
    number: string;

    @Column("integer", {
        nullable: false,
        name: "CRN"
    })
    crn: number;

    @Column("varchar", {
        nullable: true,
        name: "URL"
    })
    url: string | null;

    //@ManyToOne(type => Instructor, Instructor => Instructor.courses, {})
    //@JoinColumn({ name: "instructor_id" })
    @Column("integer", {
        nullable: true
    })
    instructor_id: Instructor | null;

    @Column("datetime", {
        nullable: true,
        name: "Timestamp"
    })
    timestamp: Date | null;
}
