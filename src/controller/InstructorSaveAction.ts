import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Instructor} from "../entity/Instructor";

/**
 * Saves given instructor.
 */
export async function instructorSaveAction(request: Request, response: Response) {

    // get a instructor repository to perform operations with instructor
    const instructorRepository = getManager().getRepository(Instructor);

    // create a real instructor object from instructor json object sent over http
    const newInstructor = instructorRepository.create(request.body);

    // save received instructor
    await instructorRepository.save(newInstructor);

    // return saved instructor back
    response.send(newInstructor);
}
