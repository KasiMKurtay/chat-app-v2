import Conversation from "../models/conversation.model.js"; 
import Message from "../models/message.model.js"; 
import { getReceiverSocketId, io } from "../socket/socket.js"; 

// Yeni mesaj gönderme işlemi
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // İstek gövdesinden mesaj içeriğini alır
    const { id: receiverId } = req.params; // URL parametresinden alıcı ID'sini alır
    const senderId = req.user._id; // Giriş yapan kullanıcının ID'sini alır

    // Bu iki kullanıcı arasında daha önce konuşma var mı diye kontrol eder
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // Her iki kullanıcı da bu konuşmada olmalı
    });

    // Eğer konuşma yoksa yeni bir konuşma oluşturur
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Yeni bir mesaj nesnesi oluşturur
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Eğer mesaj başarılı şekilde oluşturulduysa, mesajı konuşmaya ekler
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Hem konuşmayı hem mesajı aynı anda kaydeder (performans için paralel)
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET.IO kullanarak mesajı gerçek zamanlı alıcıya gönder
    const receiverSocketId = getReceiverSocketId(receiverId); // Alıcının socket.id'sini alır
    if (receiverSocketId) {
      // Eğer alıcı online ise ona yeni mesajı gönder
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Frontend'e yeni mesajı döner
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message); // Hata logu
    res.status(500).json({ error: "Internal server error" }); // Hata durumunda mesaj döner
  }
};

// İki kullanıcı arasındaki tüm mesajları getirir
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // URL'den diğer kullanıcının ID'sini alır
    const senderId = req.user._id; // Giriş yapan kullanıcının ID'si

    // Bu iki kullanıcı arasındaki konuşmayı bulur ve içindeki mesajları da getirir
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Referans değil gerçek mesaj içerikleri gelsin diye populate kullanılır

    if (!conversation) return res.status(200).json([]); // Konuşma yoksa boş dizi döner

    const messages = conversation.messages; // Mesajlar alınır

    res.status(200).json(messages); // Mesajları frontend'e gönderir
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message); // Hata logu
    res.status(500).json({ error: "Internal server error" }); // Sunucu hatası döner
  }
};
