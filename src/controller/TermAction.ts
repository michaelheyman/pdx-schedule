import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Term } from "../entity/Term";

/**
 * Loads all terms from the database.
 */
export async function termGetAllAction(request: Request, response: Response) {
    const termRepository = getManager().getRepository(Term);

    let terms = await termRepository.createQueryBuilder("term").getMany();

    response.send(terms);
}
