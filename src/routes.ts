import { instructorGetAllAction } from "./controller/InstructorGetAllAction";
import { instructorGetByIdAction } from "./controller/InstructorGetByIdAction";
import { courseGetAllAction } from "./controller/CourseGetAllAction";
import { courseGetByIdAction } from "./controller/CourseGetByIdAction";

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
        path: "/instructor/:id",
        method: "get",
        action: instructorGetByIdAction
    },
    {
        path: "/courses",
        method: "get",
        action: courseGetAllAction
    },
    {
        path: "/course/:id",
        method: "get",
        action: courseGetByIdAction
    }
];
