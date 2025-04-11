import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { messages, loading } = useGetMessages(); // Mesajları alır ve yüklenip yüklenmediğini kontrol eder.
  useListenMessages(); // Yeni gelen mesajları dinler (muhtemelen WebSocket ile).
  const lastMessageRef = useRef(); // Son mesajı referans alır, mesajlar kaydırıldığında otomatik olarak son mesaja gideriz.

  // `messages` state değiştiğinde, sayfa son mesaja kaydırılır.
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Son mesaja yavaşça kaydırma.
    }, 100); // 100ms sonra kaydırma işlemini başlatır.
  }, [messages]); // `messages` değiştiğinde tetiklenir.

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Eğer yükleme yapılmıyorsa ve mesaj varsa, mesajları map ile render eder */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            {" "}
            {/* Her mesajın sonrasına referans verir */}
            <Message message={message} /> {/* Mesaj bileşenini render eder */}
          </div>
        ))}

      {/* Yükleme sırasında skeleton'lar gösterilir */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* Mesaj yoksa bir mesaj gösterir */}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages; 
