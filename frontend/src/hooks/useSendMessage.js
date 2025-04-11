import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  // useSendMessage custom hook'unu oluşturuyoruz
  const [loading, setLoading] = useState(false); // loading state'i oluşturuyoruz, başlangıçta false
  const { messages, setMessages, selectedConversation } = useConversation(); // Zustand'tan messages, setMessages ve selectedConversation verilerini alıyoruz

  const sendMessage = async (message) => {
    // sendMessage fonksiyonunu oluşturuyoruz
    setLoading(true); // Yükleniyor durumuna geçiyoruz
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          // Seçilen conversation'a mesaj gönderiyoruz
          method: "POST", // POST isteği yapıyoruz
          headers: {
            "Content-Type": "application/json", // JSON formatında veri gönderdiğimizi belirtiyoruz
          },
          body: JSON.stringify({ message }), // Mesajı JSON formatında gönderiyoruz
        }
      );
      const data = await res.json(); // API'den gelen yanıtı JSON formatında alıyoruz
      if (data.error) throw new Error(data.error); // Eğer hata varsa, hata fırlatıyoruz

      setMessages([...messages, data]); // Gelen yeni mesajı, mevcut mesajlara ekliyoruz
    } catch (error) {
      toast.error(error.message); // Hata durumunda toast ile hata mesajı gösteriyoruz
    } finally {
      setLoading(false); // İşlem bitince loading durumunu false yapıyoruz
    }
  };

  return { sendMessage, loading }; // sendMessage fonksiyonunu ve loading durumunu dışa aktarıyoruz
};

export default useSendMessage;
