import { classOfferingGetAllAction } from "./controller/ClassOfferingAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/classes",
        method: "get",
        action: classOfferingGetAllAction
    }
];
