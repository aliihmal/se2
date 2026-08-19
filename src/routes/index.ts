import { Router } from "express";
import UserRoutes from "./user.routes";
import OrderRoutes from "./order.routes";
import Auth from "./auth.routes"
const routes = Router();

routes.get("/", (req, res) => {
    res.json({ message: "HELLO WORLD" });
});

routes.use("/orders", OrderRoutes);
routes.use("/user", UserRoutes);
routes.use("/Auth",Auth)
export default routes;  