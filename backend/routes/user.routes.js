import express from "express";
import protectRoute from "../middleware/protect.route.js";
import { getUsersForSideBar } from "../controllers/user.controller.js";

const router = express.Router(); //Express'in Router özelliğini kullanarak bir router nesnesi oluşturur. Bu nesne, rotaları yönetmek için kullanılır.

router.get("/", protectRoute, getUsersForSideBar);//Kimlik doğrulama başarılıysa, kullancınıların listesini getirir.

export default router;
