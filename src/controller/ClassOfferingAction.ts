import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ClassOffering } from "../entity/ClassOffering";
import { Instructor } from "../entity/Instructor";
import { Course } from "../entity/Course";
import { Term } from "../entity/Term";

/**
 * Loads all courses from the database.
 */
export async function classOfferingGetAllAction(
    request: Request,
    response: Response
) {
    // get a course repository to perform operations with course
    const classOfferingRepository = getManager().getRepository(ClassOffering);

    // load all courses with instructor information
    let classes = await classOfferingRepository
        .createQueryBuilder("classOffering")
        .innerJoinAndSelect("classOffering.course", "course.CourseId")
        .innerJoinAndSelect(
            "classOffering.instructor",
            "instructor.InstructorId"
        )
        .innerJoinAndSelect("classOffering.term", "term.date")
        .getMany();

    // return loaded courses
    response.send(classes);
}
