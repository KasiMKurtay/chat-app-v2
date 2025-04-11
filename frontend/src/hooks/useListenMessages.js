import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
  // useListenMessages custom hook'unu oluşturuyoruz
  const { socket } = useSocketContext(); // SocketContext'ten socket bağlantısını alıyoruz
  const { messages, setMessages } = useConversation(); // Zustand store'dan messages ve setMessages'ı alıyoruz

  useEffect(() => {
    // Component yüklendiğinde socket'e mesaj dinleme fonksiyonu ekliyoruz
    socket?.on("newMessage", (newMessage) => {
      // "newMessage" event'ini dinliyoruz
      newMessage.shouldShake = true; // Yeni gelen mesaja animasyon için flag ekliyoruz (mesajın sallanması)
      const sound = new Audio(notificationSound); // Bildirim sesi için yeni bir ses nesnesi oluşturuyoruz
      sound.play(); // Ses çalıyoruz
      setMessages([...messages, newMessage]); // Gelen yeni mesajı mevcut mesajlara ekliyoruz ve state'i güncelliyoruz
    });

    return () => socket?.off("newMessage"); // Component unmount olduğunda "newMessage" event'ini dinlemeyi sonlandırıyoruz
  }, [socket, setMessages, messages]); // socket, setMessages ve messages değiştiğinde useEffect tetiklenir
};

export default useListenMessages; // Hook'u dışa aktarıyoruz
