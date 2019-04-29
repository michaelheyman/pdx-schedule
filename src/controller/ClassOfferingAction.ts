import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ClassOffering } from "../entity/ClassOffering";
import { Term } from "../entity/Term";

/**
 * Loads all courses from the database.
 */
export async function classOfferingGetAllAction(
    request: Request,
    response: Response
) {
    const classOfferingRepository = getManager().getRepository(ClassOffering);
    const termRepository = getManager().getRepository(Term);

    let param: String = request.params["term"];

    if (param == "latest") {
        var term: String = await termRepository
            .createQueryBuilder("term")
            .select("MAX(Date) as term_Date")
            .getRawOne();
    } else {
        var term: String = await termRepository
            .createQueryBuilder("term")
            .where("term.date = :date", { date: param })
            .getRawOne();
    }

    let termDate = term ? term["term_Date"] : "";

    let classes = await classOfferingRepository
        .createQueryBuilder("classOffering")
        .innerJoinAndSelect("classOffering.course", "course.CourseId")
        .innerJoinAndSelect(
            "classOffering.instructor",
            "instructor.InstructorId"
        )
        .innerJoinAndSelect("classOffering.term", "term.date")
        .where("classOffering.term = :termDate", { termDate: termDate })
        .getMany();

    response.send(classes);
}
