import { Server } from "socket.io"; 
import http from "http"; 
import express from "express";

const app = express(); // Yeni bir Express uygulaması oluşturur

const server = http.createServer(app); // Express uygulamasını HTTP server'a dönüştürür
const io = new Server(server, {
  // HTTP server'ı kullanarak yeni bir Socket.IO sunucusu oluşturur
  cors: {
    origin: ["http://localhost:3000"], // Sadece bu origin'den gelen istekleri kabul eder (frontend URL)
    methods: ["GET", "POST"], // Sadece GET ve POST isteklerine izin verir
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Belirli bir kullanıcının socket.id'sini döner (online ise)
};

const userSocketMap = {}; // Kullanıcıların userId ile socket.id'lerini eşleyen nesne

io.on("connection", (socket) => {
  // Yeni bir bağlantı olduğunda çalışacak olay
  console.log("a user connected", socket.id); // Bağlanan kullanıcının socket id'sini terminale yazdırır

  const userId = socket.handshake.query.userId; // Kullanıcı ID'sini bağlantı sırasında gelen sorgudan alır
  if (userId != "undefined")
    // Eğer userId geçerliyse
    userSocketMap[userId] = socket.id; // userSocketMap içine userId-socketId eşleşmesini ekler

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // Tüm kullanıcılara şu anda online olan kullanıcıların userId'lerini gönderir

  socket.on("disconnect", () => {
    // Kullanıcı bağlantısını kopardığında çalışır
    console.log("user disconnected", socket.id); // Çıkan kullanıcının socket.id'sini terminale yazdırır
    delete userSocketMap[userId]; // userSocketMap'ten o kullanıcıyı siler
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // Kalan kullanıcıları tekrar tüm client'lara gönderir
  });
});

export { app, io, server }; // Bu dosyadan Express app, Socket.io nesnesi ve HTTP server'ı dışa aktarır
