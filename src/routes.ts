import { instructorGetAllAction } from "./controller/InstructorGetAllAction";
import { instructorGetByIdAction } from "./controller/InstructorGetByIdAction";
import { instructorSaveAction } from "./controller/InstructorSaveAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/instructors",
        method: "get",
        action: instructorGetAllAction
    },
    {
        path: "/instructors/:id",
        method: "get",
        action: instructorGetByIdAction
    },
    {
        path: "/instructors",
        method: "post",
        action: instructorSaveAction
    }
];
