import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protect.route.js";

const router = express.Router();//Express modülünü projeye dahil eder. Express, Node.js için bir web framework'üdür ve rotaları yönetmek için kullanılır.

router.get("/:id",protectRoute, getMessages);//GET /:id, protectRoute, Kimlik doğrulama kontrolü yapar. Kullanıcı giriş yapmışsa isteği devam ettiririr aksi takdire erişimi engeller ve Kimlik doğrulama başarılıysa, belirli bir kullanıcıya ait mesajları getirir ":id", hedef kullanıcının kimliğini temsil eder
router.post("/send/:id",protectRoute, sendMessage);//Belirli bir kullanıcıya ait mesajları getirir, Kimlik doğrulama gerektirir.

export default router; //Oluşturulan router nesnesini dışa aktarır (export), böylece başka dosyalarda kullanılabilir hale gelir.
