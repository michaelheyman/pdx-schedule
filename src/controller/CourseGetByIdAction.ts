import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Course } from "../entity/Course";

/**
 * Loads course by a given id.
 */
export async function courseGetByIdAction(
    request: Request,
    response: Response
) {
    // get a course repository to perform operations with course
    const courseRepository = getManager().getRepository(Course);

    // load a course by a given course id
    const course = await courseRepository.findOne(request.params.id);

    // if course was not found return 404 to the client
    if (!course) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded course
    response.send(course);
}
