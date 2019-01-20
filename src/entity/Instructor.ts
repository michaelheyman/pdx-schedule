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

@Entity("Instructor")
export class Instructor {
    @Column("integer", {
        nullable: false,
        primary: true,
        name: "InstructorId"
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

    @OneToMany(type => ClassOffering, ClassOffering => ClassOffering.instructor)
    classOfferings: ClassOffering[];
}
