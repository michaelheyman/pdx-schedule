import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Instructor } from "../entity/Instructor";

/**
 * Loads all instructors from the database.
 */
export async function instructorGetAllAction(request: Request, response: Response) {

    // get a instructor repository to perform operations with instructor
    const instructorRepository = getManager().getRepository(Instructor);

    // load a instructor by a given instructor id
    const instructors = await instructorRepository.find();

    // return loaded instructors
    response.send(instructors);
}
