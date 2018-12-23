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
        name: "Class"
    })
    number: string;

    @Column("varchar", {
        nullable: true,
        name: "Days"
    })
    days: string;

    @Column("varchar", {
        nullable: true,
        name: "Time"
    })
    time: string;

    @Column("integer", {
        nullable: false,
        name: "Credits"
    })
    credits: number;

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

    @ManyToOne(type => Instructor, Instructor => Instructor.courses, {})
    @JoinColumn({ name: "InstructorId" })
    instructor_id: Instructor | null;

    @Column("datetime", {
        nullable: true,
        name: "Timestamp"
    })
    timestamp: Date | null;
}
