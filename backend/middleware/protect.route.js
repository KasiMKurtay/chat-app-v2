import jwt from "jsonwebtoken";//Bu modül, (JWT) oluşturma ve doğrulama işlemi için kullanılır
import User from "../models/user.model.js";//Kullanıcı modellerini içeren dosyayı buraya dahil eder

const protectRoute = async (req, res, next) => {//Bu fonksiyon rotalara gelen istekleri işlemeden önce kimlik doğrulaması yapar
  try {
    const token = req.cookies.jwt; //İstekteki çerezden JWT token'i alır, kullanıcı giriş yaptığında çerez olarak kaydedilir
    if (!token) { //Eğer token yoksa hata mesajı döndürüyoruz
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    //Eğer Token varsa işlem devam ediyor
    const decoded = jwt.verify(token, process.env.JWT_SECRET);//Token'ı JWT_SECRET kullanarak doğrular.Eğer Token geçerliyse, içindeki bilgiler(payload) çözülür(decode edilir).

    if (!decoded) {//Eğer token doğrulanmazsa hata mesajı döner
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    //decoded.userId: Token içindeki ID'yi alır
    //User.findById: Veritabanından bu kimliğe sahip kullanıcıyı arar.
    //.select("-password") şifre hariç tüm kullanıcı bilgilerini getirir

    if (!user) {//Eğer kullanıcı bulunamazsa hata mesajı döner
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; //Kimlik doğrılama başarılıysa kullanıcı bilgilerini req.user nesnesine ekler sonraki middleware veya rotalarda kullanıcı bilgilerine erişimi kolaylaştırır

    next(); //İşlemi bir sonraki middleware veya rotaya devam ettirir
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;

//1- İstekteki JWT token'ı kontrol eder
//2-Token'ı doğrular ve içindeki ID'yi alır
//3-Veritabanından kullanıcıyı bulur ve şifre hariç req.user nesnesine ekler
//4- Kimlik doğrulama başarılıysa işlemi bir sonraki rotaya devam ettirir