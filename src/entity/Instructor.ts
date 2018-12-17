import {Index,Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, RelationId} from "typeorm";
import {Course} from "./Course";


@Entity("Instructor")
export class Instructor {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        name:"Id"
        })
    Id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"FullName"
        })
    FullName:string;
        

    @Column("varchar",{ 
        nullable:true,
        name:"FirstName"
        })
    FirstName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"LastName"
        })
    LastName:string | null;
        

    @Column("float",{ 
        nullable:true,
        name:"Rating"
        })
    Rating:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"URL"
        })
    URL:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"Timestamp"
        })
    Timestamp:Date | null;
        

   
    @OneToMany(type=>Course, Course=>Course.instructor_)
    courses:Course[];
    
}
