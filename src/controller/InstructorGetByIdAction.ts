import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Instructor } from "../entity/Instructor";

/**
 * Loads instructor by a given id.
 */
export async function instructorGetByIdAction(
    request: Request,
    response: Response
) {
    // get a instructor repository to perform operations with instructor
    const instructorRepository = getManager().getRepository(Instructor);

    // load a instructor by a given instructor id
    const instructor = await instructorRepository.findOne(request.params.id);

    // if instructor was not found return 404 to the client
    if (!instructor) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded instructor
    response.send(instructor);
}
