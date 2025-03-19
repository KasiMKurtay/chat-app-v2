import express from "express"; //Express modülünü dahil eder.
import dotenv from "dotenv"; //Dotenv modülünü dahil eder.
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"; //Kimlik doğrulama için kullanılır
import messageRoutes from "./routes/message.routes.js";//Mesajlarla ilgili işemler için kullanılan rotaları içeren dosyayı buraya aktarıyoruz
import userRoutes from "./routes/user.routes.js";//Kullanıcı işlemleri için kullanılan rotaları buraya aktarıyoruz aynı şekilde

import connectMongoDB from "./db/connectMongoDB.js"; //dosyadan veritabanına bağlanmamzı sağlayan fonksiyonu içe aktarır

const app = express(); //Express uygulamasını başlatır ve app değişkenine atar
const PORT = process.env.PORT || 5000; //Sunucunun çalşışacağı port numarasını belirler ver .env dosyasında tanımlıysa oradan çeker

dotenv.config(); //.env dosyasındaki çevresel değişiklikleri yükler

app.use(express.json()); //gelen HTTP isteklerin JSON olması durumunda verileri otomatik olarak javascript'e dönüştürürr
app.use(cookieParser());

app.use("/api/auth", authRoutes); //api/auth yoluna gelen istekleri authRoutes dosyasındaki rotalara yönlendirir
app.use("/api/messages", messageRoutes);//api messages yoluna giden istekleri messageRoutes dosyasındaki rotalara yönlendirir
app.use("/api/users", userRoutes);//api users yoluna gelen istekleri userRoutes dosyasındaki rotaya yönlendiriyorz

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.listen(PORT, () => {
  //Sucunuyu belirtilen PORT'ta başlatır
  connectMongoDB(); //MongoDB veritabanına bağlantıyı başlatır
  console.log(`Server is running on Port ${PORT}`); //Sunucunun başladığını ve hangi portta çalıştığını terminale yazdırır
});
