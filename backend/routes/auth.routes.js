import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router(); //Express'in Router özelliğini kullanarak bir router nesnesi oluşturur. BU nesne, rotaları yönetmek için kullanılır

router.post("/signup", signup); //signup yoluna gelen istekleri signup "fonksiyonuna yönlendirir, kullanıcı kayıt olma işlemini gerçekleştirmesi için buraya yönlendirilir"

router.post("/login", login); //login yoluna gelen istekleri login fonksiyonuna yönlendrir, kullanıcı oturum açma işlemini gerçekleştirir

router.post("/logout", logout);//Kullanıcının logout olmasını sağlar 

export default router;
