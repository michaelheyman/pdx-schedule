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
import { Instructor } from "./Instructor";
import { Term } from "./Term";

@Entity("ClassOffering")
export class ClassOffering {
    @Column("integer", {
        nullable: false,
        primary: true,
        name: "ClassOfferingId"
    })
    id: number;

    @ManyToOne(type => Course, Course => Course.classOfferings, {
        nullable: false
    })
    @JoinColumn({ name: "CourseId" })
    course: Course | null;

    @ManyToOne(type => Instructor, Instructor => Instructor.classOfferings, {})
    @JoinColumn({ name: "InstructorId" })
    instructor: Instructor | null;

    @ManyToOne(type => Term, Term => Term.classOfferings, {})
    @JoinColumn({ name: "Term" })
    term: Term | null;

    @Column("integer", {
        nullable: false,
        name: "Credits"
    })
    credits: number;

    @Column("varchar", {
        nullable: true,
        name: "Days"
    })
    days: string | null;

    @Column("varchar", {
        nullable: true,
        name: "Time"
    })
    time: string | null;

    @Column("integer", {
        nullable: false,
        name: "CRN"
    })
    crn: number;

    @Column("datetime", {
        nullable: true,
        name: "Timestamp"
    })
    timestamp: Date | null;
}
