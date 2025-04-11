import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  // Middleware fonksiyonu, kimlik doğrulama işlemi yapar
  try {
    const token = req.cookies.jwt; // Çerezden token alınır
    if (!token) {
      // Eğer token yoksa, kullanıcının kimliği doğrulanamaz
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" }); // Hata döner, token bulunamadı
    }

    let decoded; // Token'ı decode edilmiş hali
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrular, JWT_SECRET ile doğrulama yapılır
    } catch (error) {
      // Eğer token geçerli değilse veya süresi dolmuşsa hata yakalanır
      if (error.name === "TokenExpiredError") {
        // Token süresi dolmuşsa
        return res
          .status(401)
          .json({ error: "Unauthorized - Token has expired" }); // Hata döner, token süresi dolmuş
      }
      return res.status(401).json({ error: "Unauthorized - Invalid token" }); // Hata döner, geçersiz token
    }

    const user = await User.findById(decoded.userId).select("-password"); // Token içindeki userId ile kullanıcıyı veritabanından bulur
    if (!user) {
      // Eğer kullanıcı bulunmazsa
      return res.status(404).json({ error: "User not found" }); // Kullanıcı bulunamadı hatası döner
    }

    req.user = user; // Kullanıcı bilgilerini request nesnesine ekler, sonraki middleware veya route'larda kullanılabilir

    next(); // İşlemi bir sonraki middleware veya route'a yönlendirir
  } catch (error) {
    // Genel hata yakalama
    console.log("Error in protectRoute middleware:", error.message); // Hata mesajını loglar
    res.status(500).json({ error: "Internal Server Error" }); // Sunucu hatası döner
  }
};

export default protectRoute;
