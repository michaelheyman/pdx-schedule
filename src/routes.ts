import { classOfferingGetAllAction } from "./controller/ClassOfferingAction";
import { termGetAllAction } from "./controller/TermAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/api/classes/:term",
        method: "get",
        action: classOfferingGetAllAction
    },
    {
        path: "/api/terms",
        method: "get",
        action: termGetAllAction
    }
];
