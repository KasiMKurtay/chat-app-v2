import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config(); // .env dosyasındaki çevre değişkenlerini yükler

const __dirname = path.resolve(); // __dirname değişkenini tanımlar (proje dizinini belirtir)

// PORT, .env dosyasından veya varsayılan olarak 5000'den alınır
const PORT = process.env.PORT || 5000;

// Express.js middleware'leri
app.use(express.json()); // Gelen isteklerin JSON formatında olmasını sağlar
app.use(cookieParser()); // Cookie verilerini çözer

// Rotaların tanımlanması
app.use("/api/auth", authRoutes); // "/api/auth" yoluna gelen istekler authRoutes tarafından işlenir
app.use("/api/messages", messageRoutes); // "/api/messages" yoluna gelen istekler messageRoutes tarafından işlenir
app.use("/api/users", userRoutes); // "/api/users" yoluna gelen istekler userRoutes tarafından işlenir

// Statik dosyaların servis edilmesi (frontend'in derlenmiş dosyaları)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Herhangi bir URL ile gelen isteklerde, frontend'in index.html dosyasını döner
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Server'ı belirtilen port üzerinde çalıştırır ve MongoDB'ye bağlanır
server.listen(PORT, () => {
  connectToMongoDB(); // MongoDB'ye bağlanmak için fonksiyon çağrılır
  console.log(`Server Running on port ${PORT}`); // Server'ın çalıştığını terminale yazdırır
});
