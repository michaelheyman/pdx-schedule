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

@Entity("Term")
export class Term {
    @Column("integer", {
        nullable: false,
        primary: true,
        name: "Date"
    })
    date: number;

    @Column("varchar", {
        nullable: true,
        name: "Description"
    })
    description: string | null;

    @OneToMany(type => ClassOffering, ClassOffering => ClassOffering.term)
    classOfferings: ClassOffering[];
}
