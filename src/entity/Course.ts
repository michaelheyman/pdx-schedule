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
import { ClassOffering } from "./ClassOffering";

@Entity("Course")
export class Course {
    @Column("integer", {
        nullable: false,
        primary: true,
        name: "CourseId"
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
        nullable: false,
        name: "Discipline"
    })
    discipline: string;

    @OneToMany(type => ClassOffering, ClassOffering => ClassOffering.course)
    classOfferings: ClassOffering[];
}
