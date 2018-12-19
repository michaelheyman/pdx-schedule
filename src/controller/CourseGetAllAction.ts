import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Course } from "../entity/Course";

/**
 * Loads all courses from the database.
 */
export async function courseGetAllAction(request: Request, response: Response) {
    // get a course repository to perform operations with course
    const courseRepository = getManager().getRepository(Course);

    // load all courses with instructor information
    let courses = await courseRepository
        .createQueryBuilder("course")
        .innerJoinAndSelect("course.instructor_id", "instructor")
        .getMany();

    // return loaded courses
    response.send(courses);
}
