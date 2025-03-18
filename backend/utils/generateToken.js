import jwt from "jsonwebtoken";

const generateToken = (userId, res) => { //generateToken adında bir fonksiyon tanımlıyoruz.Bu fonksiyon, kullanıcı kimliği (userId) ve (res)"response" nesnsein alır
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {//jwt.sign ile token oluşturulur içerisinde userId bulunur. Token 15 gün boyunca geçerli olacak şekilde ayarlandı
    expiresIn: "15d",
  });

  res.cookie("jwt", token, { //Oluştuurlan JWT'yi bir HTTP cookie'si olarak ayarlar. Çerez tarayıcıda saklanır ve sonraki isteklerde sunucuya otomatik olarak gönderilir
    maxAge: 15 * 24 * 60 * 60 * 1000, //ÇEREzin geçerlilik süresini belirler çerz 15 gün boyunca geçerli olacak şekilde ayarlandı
    httpOnly: true, //Çerezin yalnızca sunucu tarafından okunaibilir olmasını sağlar.
    sameSite: "strict", //
    secure: process.env.NODE.ENV !== "development"
  });
};

export default generateToken;