import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/Auth.routes";
import { TravelBuddyRequestRoutes } from "../modules/TravelBuddyRequest/TravelBuddyRequest.routes";
import { TripRoutes } from "../modules/Trip/Trip.route";
import { UserRoutes } from "../modules/User/User.routes";

const router = Router();

const routes = [
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: TripRoutes,
  },
  {
    path: "/",
    route: TravelBuddyRequestRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
