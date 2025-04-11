import { useState } from "react"; 
import { BsSend } from "react-icons/bs"; 
import useSendMessage from "../../hooks/useSendMessage"; 

const MessageInput = () => {
  // "MessageInput" fonksiyonel bileşeni tanımlar.
  const [message, setMessage] = useState(""); // Kullanıcı mesajını tutan state.
  const { loading, sendMessage } = useSendMessage(); // Mesaj gönderme fonksiyonu ve yükleme durumu.

  // Mesaj gönderme işlemini başlatan handleSubmit fonksiyonu.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun sayfayı yeniden yüklemesini engeller.
    if (!message) return; // Mesaj boşsa işlem yapma.
    await sendMessage(message); // Mesajı göndermek için useSendMessage hook'unu çağırır.
    setMessage(""); // Mesaj gönderdikten sonra input'u temizler.
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message} // input'un değeri state'den gelir.
          onChange={(e) => setMessage(e.target.value)} // input değeri her değiştiğinde state'i günceller.
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
          {/* Eğer mesaj gönderme işlemi devam ediyorsa loading spinner'ı, aksi takdirde gönderme simgesini gösterir */}
        </button>
      </div>
    </form>
  );
};
export default MessageInput; 
