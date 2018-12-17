import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {Instructor} from "./Instructor";


@Entity("Course")
export class Course {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        name:"Id"
        })
    Id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"Name"
        })
    Name:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"Number"
        })
    Number:string;
        

    @Column("integer",{ 
        nullable:false,
        name:"CRN"
        })
    CRN:number;
        

    @Column("varchar",{ 
        nullable:true,
        name:"URL"
        })
    URL:string | null;
        

   
    @ManyToOne(type=>Instructor, Instructor=>Instructor.courses,{  })
    @JoinColumn({ name:'instructor_id'})
    instructor_:Instructor | null;


    @Column("datetime",{ 
        nullable:true,
        name:"Timestamp"
        })
    Timestamp:Date | null;
        
}
